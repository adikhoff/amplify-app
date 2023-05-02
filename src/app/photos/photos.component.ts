import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  APIService,
  CreateLikeInput,
  CreatePhotoInput,
  DeleteLikeInput,
  DeletePhotoInput,
  Like,
  Photo
} from '../API.service';
import {ZenObservable} from 'zen-observable-ts';
import {Storage} from "aws-amplify";
import {Progress} from "../model/progress";
import {IdService} from "../util/idservice";
import {CustomAPIService} from "../CustomAPI.service";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  @Input() userName: any;

  public photos: Array<PhotoUrl> = [];

  public fileName?: string;
  public files?: File[];
  public progressBars: Array<Progress> = [];
  public modalPhoto?: PhotoUrl;

  private photoCreateSubscription: ZenObservable.Subscription | null = null;
  private photoDeleteSubscription: ZenObservable.Subscription | null = null;
  private photoUpdateSubscription: ZenObservable.Subscription | null = null;
  private likeCreateSubscription: ZenObservable.Subscription | null = null;
  private likeDeleteSubscription: ZenObservable.Subscription | null = null;

  constructor(private api: APIService, private customApi: CustomAPIService, private fb: FormBuilder, private idService: IdService) {
  }

  async ngOnInit() {
    this.fetchPhotos();
    this.photoCreateSubscription = this.api.OnCreatePhotoListener().subscribe(
      (event: any) => {
        const newPhoto = event.value.data.onCreatePhoto;
        this.getPhotoUrl(newPhoto).then((url) => {
          const pu: PhotoUrl = {
            photo: newPhoto,
            url: url
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

    this.photoUpdateSubscription = this.api.OnUpdatePhotoListener().subscribe(
      (event: any) => {
        const updatedPhoto = event.value.data.onUpdatePhoto as Photo;
        console.log("Update photo event", updatedPhoto);
        //this.photos = this.photos.filter((ph) => ph.photo.id !== removedPhoto.id);
      }
    );

    this.likeCreateSubscription = this.api.OnCreateLikeListener().subscribe(
      (event: any) => {
        const newLike = event.value.data.onCreateLike as Like;
        console.log("Create like event", newLike);
        const photoUrl: PhotoUrl = this.photos.filter((ph) => ph.photo.id === newLike.photoId)[0];
        if (photoUrl.photo.likes) {
          photoUrl.photo.likes.items.push(newLike);
        }
      }
    )

    this.likeDeleteSubscription = this.api.OnDeleteLikeListener().subscribe(
      (event: any) => {
        const removedLike = event.value.data.onDeleteLike;
        console.log("Delete like event", removedLike);
        const photoUrl: PhotoUrl = this.photos.filter((ph) => ph.photo.id === removedLike.photoId)[0];
        if (photoUrl.photo.likes) {
          photoUrl.photo.likes.items = photoUrl.photo.likes.items.filter((like) => like?.user != removedLike.user);
        }
      }
    )
  }

  public fetchPhotos() {
    this.customApi.ListPhotosWithLikes({}, 1000).then((event) => {
      const photos = event.items as Photo[];
      const newPhotos: PhotoUrl[] = [];
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        this.getPhotoUrl(photo as Photo).then((url) => {
          let pu: PhotoUrl = {
            photo: photo as Photo,
            url: url,
          }
          newPhotos.push(pu);
        });
      }
      this.photos = newPhotos;
    })
  }

  ngOnDestroy() {
    if (this.photoCreateSubscription) {
      this.photoCreateSubscription.unsubscribe();
    }
    this.photoCreateSubscription = null;
  }

  public onFileSelected(e: any) {
    this.files = e?.target?.files;
    this.onUpload();
  }

  public async getPhotoUrl(photo: Photo): Promise<string> {
    if (photo.filename) {
      return Storage.get(photo.filename, {download: false});
    }
    if (photo.image) {
      return Storage.get(photo.image, {download: false});
    }
    return Storage.get("dummy", {download: false});
  }

  public onUpload() {
    try {
      if (this.files) {
        for (let i = 0; i < this.files.length; i++) {
          const file = this.files[i];
          if (file) {
            const fileExt = file.name.substring(file.name.lastIndexOf("."));
            const fileName = this.userName + "-" + this.idService.generate() + fileExt;
            const progressBar = new Progress();
            progressBar.fileName = fileName;
            this.progressBars?.push(progressBar);
            Storage.put(fileName, this.files[i], {
              level: "public",
              progressCallback(progress) {
                progressBar.loaded = progress.loaded;
                progressBar.total = progress.total;
              }
            }).then(() => {
              this.progressBars = this.progressBars.filter((el) => el.loaded !== el.total);
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (e) => {
                const image = new Image();
                if (e.target?.result) {
                  image.src = e.target.result as string;
                }
                image.onload = () => {
                  let cpi: CreatePhotoInput = {
                    user: `${this.userName}`,
                    filename: fileName,
                    width: image.width,
                    height: image.height
                  };
                  this.api.CreatePhoto(cpi).then(() => {
                  });
                };
              };

            })
          }
        }
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  public onModal(photoUrl: PhotoUrl) {
    this.modalPhoto = photoUrl;
  }

  public stopModal() {
    this.modalPhoto = undefined;
  }

  public onDelete(photo: Photo) {
    const confirmed = confirm("Weet je zeker dat je de foto wil verwijderen?");
    if (confirmed) {
      const dfi: DeletePhotoInput = {
        id: photo.id
      }
      this.api.DeletePhoto(dfi).then(() => {
      });
      if (photo.filename) {
        Storage.remove(photo.filename).then(() => {
        });
      }
    }
  }

  public isLikedByCurrent(photoUrl: PhotoUrl): boolean {
    if (photoUrl.photo === this.likeClicked) {
      return true;
    }
    if (!photoUrl.photo.likes?.items) return false;
    const search = photoUrl.photo.likes?.items.filter((item) => item?.user === this.userName);
    return search.length != 0
  }

  private likeClicked?: Photo = undefined;

  public onLike(photo: Photo) {
    this.likeClicked = photo;
    const userName = this.userName;
    if (photo.likes?.items === undefined || photo.likes?.items.filter((item) => item?.user === this.userName).length == 0) {
      const cli: CreateLikeInput = {
        user: userName,
        photoId: photo.id,
        photoLikesId: photo.id
      }
      this.api.CreateLike(cli).then(() => {});
    }
  }

  public onUnLike(photo: Photo) {
    this.likeClicked = undefined;
    const currentLike: Like | null | undefined = photo.likes?.items.filter((item) => item?.user === this.userName)[0];
    if (currentLike) {
      const dli: DeleteLikeInput = {
        id: currentLike.id
      }
      this.api.DeleteLike(dli).then((like) => {});
    }
  }

  public calcPercentage(progress: Progress) {
    if (progress.loaded && progress.total) {
      return Math.round((progress.loaded / progress.total) * 100);
    }
    return 0;
  }
}

type PhotoUrl = {
  photo: Photo
  url: string
}
