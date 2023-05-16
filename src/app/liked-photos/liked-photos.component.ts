import {Component} from '@angular/core';
import {PhotoService} from "../service/photo-service";

@Component({
  selector: 'app-liked-photos',
  templateUrl: './liked-photos.component.html',
  styleUrls: ['./liked-photos.component.css']
})
export class LikedPhotosComponent {

  constructor(
    public photoService: PhotoService
  ) {

  }

}
