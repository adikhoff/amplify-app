import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {APIService, CreatePhotoInput, Like, Photo} from '../API.service';
import {ZenObservable} from 'zen-observable-ts';
import {Storage} from "aws-amplify";
import {Progress} from "../model/progress";
import {IdService} from "../util/id-service";
import {CustomAPIService} from "../CustomAPI.service";
import {PhotoUrl} from "../model/photo-url";
import {UserService} from "../util/user-service";

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
  public userName?: string;

  private photoCreateSubscription: ZenObservable.Subscription | null = null;
  private photoDeleteSubscription: ZenObservable.Subscription | null = null;
  private photoUpdateSubscription: ZenObservable.Subscription | null = null;
  private likeCreateSubscription: ZenObservable.Subscription | null = null;
  private likeDeleteSubscription: ZenObservable.Subscription | null = null;

  constructor(private api: APIService, private customApi: CustomAPIService, private fb: FormBuilder, private idService: IdService, public userService: UserService) {
  }

  async ngOnInit() {
    this.fetchPhotos();
    this.userService.getLoggedInUsername().then(name => {
      this.userName = name;
    })
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
        //this.photos = this.photos.filter((ph) => ph.photo.id !== removedPhoto.id);
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
        const removedLike = event.value.data.onDeleteLike;
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
            const progressBar = new Progress();
            this.insertLoadingImage(file, progressBar);

            const fileExt = file.name.substring(file.name.lastIndexOf("."));
            const fileName = this.userName + "-" + this.idService.generate() + fileExt;
            this.progressBars?.push(progressBar);
            Storage.put(fileName, file, {
              level: "public",
              contentType: "image/" + fileExt,
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
                    user: this.userName!,
                    filename: fileName,
                    width: image.width,
                    height: image.height
                  };
                  this.api.CreatePhoto(cpi).then(() => {
                  });
                }
              }
            });
          }
        }
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  private insertLoadingImage(file: File, progress: Progress) {
    const photoUrl: PhotoUrl = {
      photo: {
        __typename: "Photo",
        id: "new",
        user: "none",
        createdAt: "",
        updatedAt: "",
        width: 100,
        height: 50
      },
      url: URL.createObjectURL(file),
      progress: progress
    }
    this.photos = [photoUrl, ...this.photos];
    let image: HTMLImageElement | null = document.getElementById("photo-1") as HTMLImageElement;
    image.src = URL.createObjectURL(file);
  }

  public calcPercentage(progress: Progress) {
    if (progress.loaded && progress.total) {
      return Math.round((progress.loaded / progress.total) * 100);
    }
    return 0;
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
