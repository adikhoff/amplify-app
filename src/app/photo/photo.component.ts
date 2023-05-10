import {Component, Input, OnInit} from '@angular/core';
import {PhotoUrl} from "../model/photo-url";
import {UserService} from "../service/user-service";
import {APIService, DeletePhotoInput, Photo, Profile} from "../API.service";
import {Storage} from "aws-amplify";
import {MockService} from "../service/mock-service";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  @Input() photoUrl: PhotoUrl = this.mockService.getMockPhotoUrl();
  @Input() index: any;

  public photoUserProfile?: Profile;
  public modalPhoto: PhotoUrl | undefined;

  constructor(private api: APIService, private userService: UserService, private mockService: MockService) {
  }

  ngOnInit() {
    this.photoUserProfile = this.userService.getProfileByUsername(this.photoUrl.photo.username);
  }

  public onModal(photoUrl: PhotoUrl) {
    this.modalPhoto = photoUrl;
  }

  public stopModal() {
    this.modalPhoto = undefined;
  }

  public onDelete(photo: Photo) {
    const confirmed = confirm("Weet je zeker dat je de foto wil verwijderen?");
    if (confirmed) {
      const dfi: DeletePhotoInput = {
        id: photo.id
      }
      this.api.DeletePhoto(dfi).then(() => {
      });
      if (photo.filename) {
        Storage.remove(photo.filename).then(() => {});
      }
    }
  }

  canDelete(photoUrl: PhotoUrl) {
    if (this.userService.username) {
      return photoUrl.photo.username === this.userService.username || this.userService.username === 'admin';
    }
    return false;
  }

  public finished: number[] = [];

  isFinished(index: number) {
    return this.finished.filter(id => id === index).length > 0;
  }

  onLoadPhoto(index: number) {
    this.finished.push(index);
  }
}
