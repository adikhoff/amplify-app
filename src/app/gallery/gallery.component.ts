import {Component, Input, OnInit} from '@angular/core';
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
  @Input() galleryType: string = "";
  @Input() username?: string = "";

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

  public whichPhotos(): PhotoUrl[] {
    switch (this.galleryType) {
      // case "user": //TODO: investigate why this produces an endless loop
      //   this.photoService.fetchUserPhotos(this.username!);
      //   return this.photoService.userPhotos;
      default:
        return this.photoService.newPhotos;
    }
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
