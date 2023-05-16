import {Injectable} from '@angular/core';
import {Storage} from "aws-amplify";
import {APIService, Like, ListLikesQuery, ListPhotosQuery, ModelSortDirection, Photo} from "../API.service";
import {PhotoUrl} from "../model/photo-url";
import {ZenObservable} from "zen-observable-ts";
import {CustomAPIService} from "../CustomAPI.service";

@Injectable()
export class PhotoService {
  private photoCreateSubscription: ZenObservable.Subscription | null = null;
  private photoDeleteSubscription: ZenObservable.Subscription | null = null;
  private likeCreateSubscription: ZenObservable.Subscription | null = null;
  private likeDeleteSubscription: ZenObservable.Subscription | null = null;

  private MAX_NEW_PHOTOS = 100;
  private MAX_USER_PHOTOS = 1000;
  private MAX_PHOTOS_WITH_LIKES = 50;

  private _newPhotos: PhotoUrl[] = [];
  private _userPhotos: Map<string, PhotoUrl[]> = new Map();
  private _likedPhotos: PhotoUrl[] = [];
  private _likedCutoff: number = 1;

  constructor(
    private api: APIService,
    private customApi: CustomAPIService
  ) {
    this.refresh();
    this.photoCreateSubscription = this.api.OnCreatePhotoListener().subscribe(
      (event: any) => {
        const newPhoto = event.value.data.onCreatePhoto;
        this.__processPhoto(newPhoto, -1);
      }
    );

    this.photoDeleteSubscription = this.api.OnDeletePhotoListener().subscribe(
      (event: any) => {
        const removedPhoto = event.value.data.onDeletePhoto;
        this.deletePhoto(removedPhoto);
      }
    );

    this.likeCreateSubscription = this.api.OnCreateLikeListener().subscribe(
      (event: any) => {
        const newLike = event.value.data.onCreateLike as Like;
        const photoUrl: PhotoUrl = this._newPhotos.filter((ph) => ph.photo.id === newLike.photoId)[0];
        if (photoUrl.photo.likes) {
          photoUrl.photo.likes.items = photoUrl.photo.likes.items.filter(like => like?.id !== "mock");
          photoUrl.photo.likes.items.push(newLike);
        }
      }
    )

    this.likeDeleteSubscription = this.api.OnDeleteLikeListener().subscribe(
      (event: any) => {
        const removedLike = event.value.data.onDeleteLike as Like;
        const photoUrl: PhotoUrl = this._newPhotos.filter((ph) => ph.photo.id === removedLike.photoId)[0];
        if (photoUrl.photo.likes) {
          photoUrl.photo.likes.items = photoUrl.photo.likes.items.filter((like) => like?.username != removedLike.username);
        }
      }
    )
  }

  public refresh() {
    this._newPhotos = [];
    this._userPhotos = new Map<string, PhotoUrl[]>();
    this.fetchNewPhotos();
  }

  private fetchNewPhotos() {
    this.customApi.PhotosByDate(
      "byDate",
      undefined,
      ModelSortDirection.DESC,
      {},
      this.MAX_NEW_PHOTOS
    ).then((event) => {
      const photos = event.items as Photo[];
      for (let i = 0; i < photos.length; i++) {
        this.__processPhoto(photos[i], 1);
      }
    })
  }

  public fetchOlderUserPhotos(username: string) {
    const current = this.safeGet(this._userPhotos, username);
    const oldest = current[current.length - 1];
    this.customApi.PhotosByDate(
      "byDate",
      undefined,
      ModelSortDirection.DESC,
      {
        username: {eq: username},
        createdAt: {lt: oldest.photo.createdAt}
      },
      this.MAX_USER_PHOTOS
    ).then((event) => {
      const photos = event.items as Photo[];
      for (let i = 0; i < photos.length; i++) {
        this.__processPhoto(photos[i], 1);
      }
    })
  }

  public async fetchPhotosByLikes() {
    let highScores: Photo[] = [];
    let nextToken: string | null | undefined = "";
    do {
      const queryResult: ListPhotosQuery = await this.customApi.ListPhotosWithData({}, 1000, nextToken);
      console.log("queryResult", queryResult);
      highScores = [...highScores, ...queryResult.items as Photo[]];
      nextToken = queryResult.nextToken;
    } while (nextToken);
    console.log("allPhotos", highScores);
    let cutoff = 0;
    while (highScores.length > this.MAX_PHOTOS_WITH_LIKES) {
      highScores = highScores.filter(p => p.likes!.items.length > cutoff);
      cutoff++;
    }
    this._likedCutoff = cutoff;
    console.log("Filtered", highScores);
    this._likedPhotos = [];
    this.processPhotos(highScores, this._likedPhotos);
  }

  private processPhotos(photos: Photo[], toCollection: PhotoUrl[]) {
    let proms: Promise<PhotoUrl>[] = [];
    photos.forEach(p => {
      const prom = this.processPhoto(p);
      proms.push(prom);
    })
    Promise.all(proms).then((proms) => {
      proms.forEach(pu => {
        toCollection.push(pu);
      })
    });
  }

  private async processPhoto(photo: Photo): Promise<PhotoUrl> {
    const url = await this.getObjectUrl(photo as Photo)
    let pu: PhotoUrl = {
      photo: photo as Photo,
      url: url,
      loading: true,
    }
    return pu;
  }

  private __processPhoto(photo: Photo, dir: number) {
    this.getObjectUrl(photo as Photo).then(url => {
      let pu: PhotoUrl = {
        photo: photo as Photo,
        url: url,
        loading: true,
      }
      //TODO: get rid of the globals here
      this._newPhotos = this.insert(this._newPhotos, pu, dir);
      this._userPhotos.set(photo.username, this.insert(this.safeGet(this._userPhotos, photo.username), pu, dir));
    });
  }

  private insert(arr: PhotoUrl[], ins: PhotoUrl, dir: number): PhotoUrl[] {
    let newArr: PhotoUrl[] = arr;
    if (dir > 0) {
      newArr.push(ins);
    } else {
      newArr = [ins, ...newArr];
    }
    return newArr;
  }

  private deletePhoto(photo: Photo) {
    this._newPhotos = this._newPhotos.filter(ph => ph.photo.id !== photo.id);
    this._userPhotos.set(photo.username, this.safeGet(this._userPhotos, photo.username).filter(ph => ph.photo.id !== photo.id));
  }

  public async getObjectUrl(photo: Photo): Promise<string> {
    return Storage.get(photo.filename, {download: false});
  }

  get newPhotos(): PhotoUrl[] {
    return this._newPhotos;
  }

  get userPhotos(): Map<string, PhotoUrl[]> {
    return this._userPhotos;
  }

  get likedPhotos(): PhotoUrl[] {
    return this._likedPhotos;
  }

  get likedCutoff(): number {
    return this._likedCutoff;
  }

  private safeGet(map: Map<string, PhotoUrl[]>, name: string): PhotoUrl[] {
    let res = map.get(name);
    if (!res) {
      res = [];
      map.set(name, res);
    }
    return res;
  }

}
