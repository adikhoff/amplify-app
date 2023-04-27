import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APIService, CreatePhotoInput, Photo, Restaurant} from '../API.service';
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
  private photoSubscription: ZenObservable.Subscription | null = null;

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
          let pu: PhotoUrl = {
            photo: photo as Photo,
            url: url
          }
          this.photos.push(pu);
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

    this.photoSubscription = this.api.OnCreatePhotoListener().subscribe(
      (event: any) => {
        const newPhoto = event.value.data.onCreatePhoto;
        this.getPhotoUrl(newPhoto).then((url) => {
          const pu: PhotoUrl = {
            photo: newPhoto,
            url: url
          }
          this.photos = [pu, ...this.photos];
        })
      }
    );
  }

  ngOnDestroy() {
    if (this.restaurantSubscription) {
      this.restaurantSubscription.unsubscribe();
    }
    if (this.photoSubscription) {
      this.photoSubscription.unsubscribe();
    }
    this.restaurantSubscription = null;
    this.photoSubscription = null;
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

  // public fetchImages() {
  //   Storage.list('', { level: 'public' })
  //     .then(({ results }) => console.log(results))
  //     .catch((err) => console.log(err));
  // }

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
