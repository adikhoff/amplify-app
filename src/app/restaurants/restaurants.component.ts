import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APIService, Restaurant} from '../API.service';
import {ZenObservable} from 'zen-observable-ts';
import {Storage} from "aws-amplify";
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

  public fileName?: string;
  public files?: File[];
  public progressBars: Progress[];

  private subscription: ZenObservable.Subscription | null = null;

  constructor(private api: APIService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.progressBars = [];
  }

  async ngOnInit() {
    /* fetch restaurants when app loads */
    this.api.ListRestaurants().then((event) => {
      this.restaurants = event.items as Restaurant[];
    });

    /* subscribe to new restaurants being created */
    this.subscription = this.api.OnCreateRestaurantListener().subscribe(
      (event: any) => {
        const newRestaurant = event.value.data.onCreateRestaurant;
        this.restaurants = [newRestaurant, ...this.restaurants];
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }

  public onCreate(restaurant: Restaurant) {
    this.api
      .CreateRestaurant(restaurant)
      .then((event) => {
        console.log('item created!');
        this.createForm.reset();
      })
      .catch((e) => {
        console.log('error creating restaurant...', e);
      });
  }

  public onFileSelected(e: any) {
    console.log("Storing " + e?.target?.files.length);
    this.files = e?.target?.files;
    this.onUpload();
  }

  public onUpload() {
    try {
      if (this.files) {
        for (let i = 0; i < this.files.length; i++) {
          console.log("Uploading " + this.files[i].name);
          const progressBar = new Progress();
          progressBar.fileName = this.files[i].name;
          this.progressBars?.push(progressBar);
          Storage.put(this.files[i].name, this.files[i], {
            level: "public",
            progressCallback(progress) {
              progressBar.loaded = progress.loaded;
              progressBar.total = progress.total;
              console.log(` Uploaded: ${progress.loaded}/${progress.total}`);
            }
          });
        }
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }

  }

  public calcPercentage(progress: Progress) {
    if (progress.loaded && progress.total) {
      return Math.round((progress.loaded / progress.total) * 100);
    }
    return 0;
  }

}
