import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

/* new form imports */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosComponent } from './photos/photos.component';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { PhotoComponent } from './photos/photo/photo.component';
import { LikeCounterComponent } from './photos/like-counter/like-counter.component';
import {UserService} from "./util/user-service";

@NgModule({
  declarations: [AppComponent, PhotosComponent, MyPhotosComponent, PhotoComponent, LikeCounterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    /* configuring form modules */
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
