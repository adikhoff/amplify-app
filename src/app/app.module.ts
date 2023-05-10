import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

/* new form imports */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosComponent } from './photos/photos.component';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { PhotoComponent } from './photo/photo.component';
import { LikeCounterComponent } from './photos/like-counter/like-counter.component';
import { UserService } from "./service/user-service";
import { UploadComponent } from './upload/upload.component';
import { AvatarComponent } from './avatar/avatar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';
import { LegalComponent } from './legal/legal.component';
import { WaitingComponent } from './waiting/waiting.component';

@NgModule({
  declarations: [AppComponent, PhotosComponent, MyPhotosComponent, PhotoComponent, LikeCounterComponent, UploadComponent, AvatarComponent, NavigationComponent, ProfileComponent, LegalComponent, WaitingComponent],
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
