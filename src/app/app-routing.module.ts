import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {LegalComponent} from "./legal/legal.component";
import {LikedPhotosComponent} from "./liked-photos/liked-photos.component";
import {NewPhotosComponent} from "./new-photos/new-photos.component";

const routes: Routes = [
  {path: 'likes', component: LikedPhotosComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'profile', component: ProfileComponent},

  {path: 'legal', component: LegalComponent},

  {path: '', pathMatch: "full", component: NewPhotosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
