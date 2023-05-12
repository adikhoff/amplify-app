import {Component, OnInit} from '@angular/core';
import {Photo} from '../API.service';
import {Progress} from "../model/progress";
import {PhotoUrl} from "../model/photo-url";
import {UserService} from "../service/user-service";
import {PhotoService} from "../service/photo-service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  private SLEEP_THRESHOLD = 5000;

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
    let now = new Date().getTime();
    setInterval (() => {
      if ((new Date().getTime() - now) > this.SLEEP_THRESHOLD) {
        console.log ('wake-up from sleep detected');
      }
      now = new Date().getTime();
    }, 1000);
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
