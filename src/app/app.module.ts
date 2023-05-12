import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AmplifyAuthenticatorModule} from '@aws-amplify/ui-angular';

/* new form imports */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GalleryComponent} from './photos/gallery.component';
import {MyPhotosComponent} from './my-photos/my-photos.component';
import {PhotoComponent} from './photo/photo.component';
import {LikeCounterComponent} from './photos/like-counter/like-counter.component';
import {UserService} from "./service/user-service";
import {UploadComponent} from './upload/upload.component';
import {AvatarComponent} from './avatar/avatar.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ProfileComponent} from './profile/profile.component';
import {LegalComponent} from './legal/legal.component';
import {WaitingComponent} from './waiting/waiting.component';
import {LoggedInContainerComponent} from './logged-in-container/logged-in-container.component';
import {PhotoService} from "./service/photo-service";

@NgModule({
  declarations: [AppComponent, GalleryComponent, MyPhotosComponent, PhotoComponent, LikeCounterComponent, UploadComponent, AvatarComponent, NavigationComponent, ProfileComponent, LegalComponent, WaitingComponent, LoggedInContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    /* configuring form modules */
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
