import {Injectable} from '@angular/core';
import {Storage} from "aws-amplify";
import {APIService, Like, ModelSortDirection, Photo} from "../API.service";
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

  private _newPhotos: PhotoUrl[] = [];
  private _userPhotos: Map<string, PhotoUrl[]> = new Map();

  constructor(
    private api: APIService,
    private customApi: CustomAPIService
  ) {
    this.refresh();
    this.photoCreateSubscription = this.api.OnCreatePhotoListener().subscribe(
      (event: any) => {
        const newPhoto = event.value.data.onCreatePhoto;
        this.processPhoto(newPhoto, -1);
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
        this.processPhoto(photos[i], 1);
      }
    })
  }

  public fetchNewUserPhotos(username: string) {
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
        this.processPhoto(photos[i], 1);
      }
    })
  }

  private processPhoto(photo: Photo, dir: number) {
    this.getObjectUrl(photo as Photo).then(url => {
      let pu: PhotoUrl = {
        photo: photo as Photo,
        url: url,
        loading: true,
      }
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

  private safeGet(map: Map<string, PhotoUrl[]>, name: string): PhotoUrl[] {
    let res = map.get(name);
    if (!res) {
      res = [];
      map.set(name, res);
    }
    return res;
  }

}
