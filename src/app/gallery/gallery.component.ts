import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Photo, Profile} from '../API.service';
import {Progress} from "../model/progress";
import {PhotoUrl} from "../model/photo-url";
import {UserService} from "../service/user-service";
import {PhotoService} from "../service/photo-service";
import {map, Subject} from "rxjs";
import {MockService} from "../service/mock-service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  @Input() galleryType: string = "";
  @Input() username?: string = "";

  public fileName?: string;
  public files?: File[];
  public progressBars: Progress[] = [];
  public modalPhoto?: PhotoUrl;

  public allProfiles?: Profile[];
  public allProfiles$: Subject<Profile[]> = this.userService.allProfiles;


  constructor(
    public userService: UserService,
    public photoService: PhotoService,
    public mockService: MockService
  ) {
  }

  async ngOnInit() {
    this.allProfiles$.subscribe((evt: Profile[]) => {
      console.log("setting all profiles");
      this.allProfiles = evt;
      console.log("all profiles: ", this.allProfiles);
    });
  }

  ngOnDestroy() {
    this.allProfiles$.unsubscribe();
  }

  public getProfileForUser(username: string): Profile {
    if (this.allProfiles) {
      return this.allProfiles.filter(p => p.username === username)[0];
    } else {
      return this.mockService.getMockProfile();
    }
  }

  public getTrackBy(index: number, photoUrl: PhotoUrl): string {
    return photoUrl.photo.filename;
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
