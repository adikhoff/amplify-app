import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PhotosComponent} from "./photos/photos.component";
import {ProfileComponent} from "./profile/profile.component";
import {LegalComponent} from "./legal/legal.component";

const routes: Routes = [
  {path: 'gallery', component: PhotosComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'profile', component: ProfileComponent},

  {path: 'legal', component: LegalComponent},

  {path: '', pathMatch: "full", component: PhotosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
