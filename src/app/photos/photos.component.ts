import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  APIService,
  CreateLikeInput,
  CreatePhotoInput,
  DeleteLikeInput,
  DeletePhotoInput,
  Photo
} from '../API.service';
import {ZenObservable} from 'zen-observable-ts';
import {Auth, Storage} from "aws-amplify";
import {Progress} from "../model/progress";
import {IdService} from "../util/idservice";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  @Input() userName: any;
  public createForm: FormGroup;

  public photos: Array<PhotoUrl> = [];

  public fileName?: string;
  public files?: File[];
  public progressBars: Array<Progress> = [];
  public modalPhoto?: PhotoUrl;

  private photoCreateSubscription: ZenObservable.Subscription | null = null;
  private photoDeleteSubscription: ZenObservable.Subscription | null = null;
  private likeCreateSubscription: ZenObservable.Subscription | null = null;
  private likeDeleteSubscription: ZenObservable.Subscription | null = null;

  constructor(private api: APIService, private fb: FormBuilder, private idService: IdService) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.fetchPhotos();
    this.photoCreateSubscription = this.api.OnCreatePhotoListener().subscribe(
      (event: any) => {
        const newPhoto = event.value.data.onCreatePhoto;
        this.getPhotoUrl(newPhoto).then((url) => {
          this.api.ListLikes({photoId: {eq: newPhoto.id}}).then((likes) => {
            const pu: PhotoUrl = {
              photo: newPhoto,
              url: url,
              likes: likes.items.map((item) => item?.user)
            }
            this.photos = [pu, ...this.photos];
          });
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
        const newLike = event.value.data.onCreateLike;
        const photoUrl: PhotoUrl = this.photos.filter((ph) => ph.photo.id === newLike.photoId)[0];
        photoUrl.likes.push(newLike.user);
      }
    )

    this.likeDeleteSubscription = this.api.OnDeleteLikeListener().subscribe(
      (event: any) => {
        const removedLike = event.value.data.onDeleteLike;
        const photoUrl: PhotoUrl = this.photos.filter((ph) => ph.photo.id === removedLike.photoId)[0];
        photoUrl.likes = photoUrl.likes.filter((pu) => pu !== removedLike.user);
      }
    )
  }

  public fetchPhotos() {
    this.api.ListPhotos().then((event) => {
      const photos = event.items as Photo[];
      const newPhotos: PhotoUrl[] = [];
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        this.getPhotoUrl(photo).then((url) => {
          this.api.ListLikes({photoId: {eq: photo.id}}).then((likes) => {
            let pu: PhotoUrl = {
              photo: photo as Photo,
              url: url,
              likes: likes.items.map((item) => item?.user)
            }
            newPhotos.push(pu);
          })
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
    return Storage.get(photo.image, {download: false});
  }

  public onUpload() {
    try {
      if (this.files) {
        for (let i = 0; i < this.files.length; i++) {
          const fileExt = this.files[i].name.substring(this.files[i].name.lastIndexOf("."));
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

            let cpi: CreatePhotoInput = {
              user: `${this.userName}`,
              image: fileName
            };

            this.api.CreatePhoto(cpi);
          })
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
      this.api.ListLikes({photoId: {eq: photo.id}}).then((likes) => {
        for (let i = 0; i < likes.items.length; i++) {
          const item = likes.items[i];
          if (item?.id) {
            const dli: DeleteLikeInput = {
              id: item.id
            }
            this.api.DeleteLike(dli).then(() => {
            });
          }
        }
        const dfi: DeletePhotoInput = {
          id: photo.id
        }
        this.api.DeletePhoto(dfi).then(() => {
        });
        Storage.remove(photo.image).then(() => {
        });
      });
    }
  }

  public isLikedByCurrent(photoUrl: PhotoUrl): boolean {
    if (photoUrl.photo === this.likeClicked) {
      return true;
    }
    return photoUrl.likes.filter((un) => un === this.userName).length != 0
    return false;
  }

  private likeClicked?: Photo = undefined;

  public onLike(photo: Photo) {
    this.likeClicked = photo;
    const userName = this.userName;
    this.api.ListLikes({user: {eq: userName}, photoId: {eq: photo.id}}).then((like) => {
      if (like.items.length === 0) {
        const cli: CreateLikeInput = {
          user: userName,
          photoId: photo.id
        }
        this.api.CreateLike(cli);
      }
    });
  }

  public onUnLike(photo: Photo) {
    this.likeClicked = undefined;
    this.api.ListLikes({user: {eq: this.userName}, photoId: {eq: photo.id}}).then((like) => {
      if (like.items[0]) {
        const dli: DeleteLikeInput = {
          id: like.items[0].id
        }
        this.api.DeleteLike(dli);
      }
    })
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
  likes: (string | undefined)[]
}
