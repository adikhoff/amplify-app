import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  APIService,
  CreateLikeInput,
  CreatePhotoInput,
  DeleteLikeInput,
  DeletePhotoInput,
  Photo,
  Restaurant
} from '../API.service';
import {ZenObservable} from 'zen-observable-ts';
import {Auth, Storage} from "aws-amplify";
import {Progress} from "../model/progress";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  public createForm: FormGroup;

  /* declare restaurants variable */
  public restaurants: Array<Restaurant> = [];
  public photos: Array<PhotoUrl> = [];

  public fileName?: string;
  public files?: File[];
  public progressBars: Array<Progress> = [];
  public userName?: string;

  private restaurantSubscription: ZenObservable.Subscription | null = null;
  private photoCreateSubscription: ZenObservable.Subscription | null = null;
  private photoDeleteSubscription: ZenObservable.Subscription | null = null;
  private likeCreateSubscription: ZenObservable.Subscription | null = null;
  private likeDeleteSubscription: ZenObservable.Subscription | null = null;

  constructor(private api: APIService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required]
    });
    Auth.currentSession().then((ses) => this.userName = ses.getAccessToken().payload["username"]);
  }

  async ngOnInit() {
    /* fetch restaurants when app loads */
    this.api.ListRestaurants().then((event) => {
      this.restaurants = event.items as Restaurant[];
    });

    this.api.ListPhotos().then((event) => {
      const photos = event.items as Photo[];
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        this.getPhotoUrl(photo).then((url) => {
          this.api.ListLikes({photoId: {eq: photo.id}}).then((likes) => {
            let pu: PhotoUrl = {
              photo: photo as Photo,
              url: url,
              likes: likes.items.map((item) => item?.user)
            }
            this.photos.push(pu);
          })
        });
      }
    })

    /* subscribe to new restaurants being created */
    this.restaurantSubscription = this.api.OnCreateRestaurantListener().subscribe(
      (event: any) => {
        const newRestaurant = event.value.data.onCreateRestaurant;
        this.restaurants = [newRestaurant, ...this.restaurants];
      }
    );

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
        console.log("Delete event");
        console.log(event);
        const removedLike = event.value.data.onDeleteLike;
        const photoUrl: PhotoUrl = this.photos.filter((ph) => ph.photo.id === removedLike.photoId)[0];
        photoUrl.likes = photoUrl.likes.filter((pu) => pu !== removedLike.user);
      }
    )
  }

  ngOnDestroy() {
    if (this.restaurantSubscription) {
      this.restaurantSubscription.unsubscribe();
    }
    if (this.photoCreateSubscription) {
      this.photoCreateSubscription.unsubscribe();
    }
    this.restaurantSubscription = null;
    this.photoCreateSubscription = null;
  }

  public onCreate(restaurant: Restaurant) {
    this.api
      .CreateRestaurant(restaurant)
      .then((event) => {
        this.createForm.reset();
      })
      .catch((e) => {
        console.log('error creating restaurant...', e);
      });
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
      if (this.files && this.userName) {
        for (let i = 0; i < this.files.length; i++) {
          const fileName = this.userName + "-" + this.files[i].name;
          const progressBar = new Progress();
          progressBar.fileName = fileName;
          this.progressBars?.push(progressBar);
          Storage.put(fileName, this.files[i], {
            level: "public",
            progressCallback(progress) {
              progressBar.loaded = progress.loaded;
              progressBar.total = progress.total;
              console.log(` Uploaded: ${progress.loaded}/${progress.total}`);
            }
          }).then(() => {
            this.progressBars = this.progressBars.filter((el) => el.loaded !== el.total);

            let post: CreatePhotoInput = {
              user: `${this.userName}`,
              image: fileName
            };

            this.api.CreatePhoto(post);
          })
        }
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }

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
            this.api.DeleteLike(dli);
          }
        }
        const dfi: DeletePhotoInput = {
          id: photo.id
        }
        this.api.DeletePhoto(dfi);
      });
    }
  }

  public isLikedByCurrent(photoUrl: PhotoUrl): boolean {
    if (this.userName) {
      return photoUrl.likes.filter((un) => un === this.userName).length != 0
    }
    return false;
  }

  public onLike(photo: Photo) {
    if (this.userName) {
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
  }

  public onUnLike(photo: Photo) {
    if (this.userName) {
      this.api.ListLikes({user: {eq: this.userName}, photoId: {eq: photo.id}}).then((like) => {
        if (like.items[0]) {
          const dli: DeleteLikeInput = {
            id: like.items[0].id
          }
          this.api.DeleteLike(dli);
        }
      })
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
  likes: (string | undefined)[]
}
