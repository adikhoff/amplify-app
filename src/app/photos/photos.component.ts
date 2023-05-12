import {Component, OnInit} from '@angular/core';
import {Photo} from '../API.service';
import {Progress} from "../model/progress";
import {PhotoUrl} from "../model/photo-url";
import {UserService} from "../service/user-service";
import {PhotoService} from "../service/photo-service";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  public fileName?: string;
  public files?: File[];
  public progressBars: Progress[] = [];
  public modalPhoto?: PhotoUrl;

  constructor(
    public userService: UserService,
    public photoService: PhotoService
  ) {
  }

  async ngOnInit() {
  }

  public createUrl(photo: Photo, size: number): string {
    if (size === 0) return photo.filename;
    const parts = photo.filename.split(".");
    return parts[0] + "_" + size + "." + parts[1];
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
