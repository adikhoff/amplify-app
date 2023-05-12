import {Injectable} from '@angular/core';
import {Storage} from "aws-amplify";
import {APIService, Like, ModelSortDirection, Photo} from "../API.service";
import {PhotoUrl} from "../model/photo-url";
import {ZenObservable} from "zen-observable-ts";
import {CustomAPIService} from "../CustomAPI.service";
import {UserService} from "./user-service";

@Injectable()
export class PhotoService {
  private photoCreateSubscription: ZenObservable.Subscription | null = null;
  private photoDeleteSubscription: ZenObservable.Subscription | null = null;
  private likeCreateSubscription: ZenObservable.Subscription | null = null;
  private likeDeleteSubscription: ZenObservable.Subscription | null = null;

  private MAX_NEW_PHOTOS = 100;
  private MAX_USER_PHOTOS = 1000;

  private _newPhotos: PhotoUrl[] = [];
  private _userPhotos: PhotoUrl[] = [];

  constructor(
    private api: APIService,
    private customApi: CustomAPIService,
    private userService: UserService,
  ) {
    this.refresh();
    this.photoCreateSubscription = this.api.OnCreatePhotoListener().subscribe(
      (event: any) => {
        const newPhoto = event.value.data.onCreatePhoto;
        this.getObjectUrl(newPhoto).then((url) => {
          const pu: PhotoUrl = {
            photo: newPhoto,
            url: url,
            loading: true,
          }
          this._newPhotos = [pu, ...this._newPhotos];
          while (this._newPhotos.length > this.MAX_NEW_PHOTOS) { this._newPhotos.pop(); }
        });
      }
    );

    this.photoDeleteSubscription = this.api.OnDeletePhotoListener().subscribe(
      (event: any) => {
        const removedPhoto = event.value.data.onDeletePhoto;
        this._newPhotos = this._newPhotos.filter((ph) => ph.photo.id !== removedPhoto.id);
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
      this._newPhotos = this.processPhotos(event);
    })
  }

  public fetchUserPhotos(username: string) {
    this.customApi.PhotosByDate(
      "byDate",
      undefined,
      ModelSortDirection.DESC,
      { username: {eq: username }},
      this.MAX_USER_PHOTOS
    ).then((event) => {
      this._userPhotos = this.processPhotos(event);
    })
  }

  private processPhotos(event: any) {
    const photos = event.items as Photo[];
    const newPhotos: PhotoUrl[] = [];
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      this.getObjectUrl(photo as Photo).then(url => {
        let pu: PhotoUrl = {
          photo: photo as Photo,
          url: url,
          loading: true,
        }
        newPhotos.push(pu);
      });
    }
    return newPhotos;
  }

  public async getObjectUrl(photo: Photo): Promise<string> {
    return Storage.get(photo.filename, {download: false});
  }

  get newPhotos(): PhotoUrl[] {
    return this._newPhotos;
  }

  get userPhotos(): PhotoUrl[] {
    return this._userPhotos;
  }
}
