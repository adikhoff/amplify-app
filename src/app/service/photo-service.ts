import {Injectable} from '@angular/core';
import {Storage} from "aws-amplify";
import {APIService, Like, ListPhotosQuery, ModelSortDirection, Photo} from "../API.service";
import {PhotoUrl} from "../model/photo-url";
import {ZenObservable} from "zen-observable-ts";
import {CustomAPIService} from "../CustomAPI.service";

@Injectable()
export class PhotoService {
  private photoCreateSubscription: ZenObservable.Subscription | null = null;
  private photoDeleteSubscription: ZenObservable.Subscription | null = null;
  private likeCreateSubscription: ZenObservable.Subscription | null = null;
  private likeDeleteSubscription: ZenObservable.Subscription | null = null;

  private MAX_NEW_PHOTOS = 1000;
  private MAX_USER_PHOTOS = 1000;
  private MAX_PHOTOS_WITH_LIKES = 50;
  private MIN_PHOTOS_WITH_LIKES = 25;

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
        this.processPhoto(newPhoto).then(pu => {
          this._newPhotos.unshift(pu);
          this._newPhotos.slice(0, this.MAX_NEW_PHOTOS);
        });
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
      this.processPhotos(photos, this._newPhotos);
    })
  }

  public fetchUserPhotos(username: string) {
    this.customApi.PhotosByDate(
      "byDate",
      undefined,
      ModelSortDirection.DESC,
      {
        username: {eq: username},
      },
      this.MAX_USER_PHOTOS
    ).then((event) => {
      const photos = event.items as Photo[];
      this.processPhotos(photos, this.safeGet(this._userPhotos, username));
    });
  }

  public async fetchPhotosByLikes() {
    let highScores: Photo[] = [];
    let nextToken: string | null | undefined = "";
    do {
      const queryResult: ListPhotosQuery = await this.customApi.ListPhotosWithData({}, 1000, nextToken);
      highScores = highScores.concat(queryResult.items as Photo[]);
      nextToken = queryResult.nextToken;
    } while (nextToken);
    let cutoff = 0;
    do {
      const newHighScores = highScores.filter(p => p.likes!.items.length > cutoff);
      if (newHighScores.length < this.MIN_PHOTOS_WITH_LIKES) {
        break;
      } else {
        highScores = newHighScores;
        cutoff++;
      }
    } while (highScores.length > this.MAX_PHOTOS_WITH_LIKES);
    this._likedCutoff = cutoff;

    highScores = highScores.sort((a, b) => {
      if (a.likes?.items.length && b.likes?.items.length) {
        return b.likes?.items.length - a.likes?.items.length;
      } else {
        return 0;
      }
    });

    this._likedPhotos = [];
    this.processPhotos(highScores, this._likedPhotos);
  }

  private processPhotos(photos: Photo[], toCollection: PhotoUrl[]) {
    let proms: Promise<PhotoUrl>[] = [];
    photos.forEach(p => {
      const prom = this.processPhoto(p);
      proms.push(prom);
    })
    Promise.all(proms).then((awaited) => {
      awaited.forEach(pu => {
        toCollection.push(pu);
      })
    });
  }

  private async processPhoto(photo: Photo): Promise<PhotoUrl> {
    const url = await this.getObjectUrl(photo as Photo)
    return {
      photo: photo as Photo,
      url: url,
      loading: true,
    };
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
