import {Component, OnDestroy, OnInit} from '@angular/core';
import {APIService, Like, ModelSortDirection, Photo} from '../API.service';
import {ZenObservable} from 'zen-observable-ts';
import {Storage} from "aws-amplify";
import {Progress} from "../model/progress";
import {CustomAPIService} from "../CustomAPI.service";
import {PhotoUrl} from "../model/photo-url";
import {UserService} from "../service/user-service";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  public photos: Array<PhotoUrl> = [];

  public fileName?: string;
  public files?: File[];
  public progressBars: Array<Progress> = [];
  public modalPhoto?: PhotoUrl;

  private photoCreateSubscription: ZenObservable.Subscription | null = null;
  private photoDeleteSubscription: ZenObservable.Subscription | null = null;
  private likeCreateSubscription: ZenObservable.Subscription | null = null;
  private likeDeleteSubscription: ZenObservable.Subscription | null = null;

  constructor(
    private api: APIService,
    private customApi: CustomAPIService,
    public userService: UserService) {
  }

  async ngOnInit() {
    // Todo: migrate all this to app.component, so we don't lose the data between page switches
    this.fetchPhotos();
    this.photoCreateSubscription = this.api.OnCreatePhotoListener().subscribe(
      (event: any) => {
        const newPhoto = event.value.data.onCreatePhoto;
        this.getObjectUrl(newPhoto).then((url) => {
          const pu: PhotoUrl = {
            photo: newPhoto,
            url: url,
            loading: true,
          }
          this.photos = [pu, ...this.photos];
        });
      }
    );

    this.photoDeleteSubscription = this.api.OnDeletePhotoListener().subscribe(
      (event: any) => {
        const removedPhoto = event.value.data.onDeletePhoto;
        this.photos = this.photos.filter((ph) => ph.photo.id !== removedPhoto.id);
      }
    );

    this.likeCreateSubscription = this.api.OnCreateLikeListener().subscribe(
      (event: any) => {
        const newLike = event.value.data.onCreateLike as Like;
        const photoUrl: PhotoUrl = this.photos.filter((ph) => ph.photo.id === newLike.photoId)[0];
        if (photoUrl.photo.likes) {
          photoUrl.photo.likes.items = photoUrl.photo.likes.items.filter(like => like?.id !== "mock");
          photoUrl.photo.likes.items.push(newLike);
        }
      }
    )

    this.likeDeleteSubscription = this.api.OnDeleteLikeListener().subscribe(
      (event: any) => {
        const removedLike = event.value.data.onDeleteLike as Like;
        const photoUrl: PhotoUrl = this.photos.filter((ph) => ph.photo.id === removedLike.photoId)[0];
        if (photoUrl.photo.likes) {
          photoUrl.photo.likes.items = photoUrl.photo.likes.items.filter((like) => like?.username != removedLike.username);
        }
      }
    )
  }

  ngOnDestroy() {
    if (this.photoCreateSubscription) {
      this.photoCreateSubscription.unsubscribe();
    }
    this.photoCreateSubscription = null;
  }

  public fetchPhotos() {
    this.customApi.PhotosByDate("byDate", undefined, ModelSortDirection.DESC).then((event) => {
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
      this.photos = newPhotos;
    })
  }

  public async getObjectUrl(photo: Photo): Promise<string> {
    return Storage.get(photo.filename, {download: false });
  }

  public createUrl(photo: Photo, size: number): string {
    if (size === 0) return photo.filename;
    const parts = photo.filename.split(".");
    return parts[0] + "_" + size + "." + parts[1];
  }

  public calcStyle(photo: Photo, i: number) {
    let newStyle: string = "height: 100px;";
    const div: HTMLElement = document.querySelector("#div-photo-" + i) as HTMLElement;
    if (div) {
      const width = div.clientWidth;
      if (photo.width && photo.height) {
        newStyle = "height: " + (((width / photo.width) * photo.height) + 10) + "px;";
      }
    }
    return newStyle;
  }

}
