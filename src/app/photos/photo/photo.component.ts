import {Component, Input, OnInit} from '@angular/core';
import {PhotoUrl} from "../../model/photo-url";
import {UserService} from "../../util/user-service";
import {APIService, DeletePhotoInput, Photo} from "../../API.service";
import {Storage} from "aws-amplify";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  @Input() photoUrl: PhotoUrl = {
    photo: {
      __typename: "Photo",
      id: "",
      user: "",
      createdAt: "",
      updatedAt: ""
    },
    url: ""
  };
  @Input() index: any;

  public userName?: string;
  public modalPhoto: PhotoUrl | undefined;

  constructor(private api: APIService, public userService: UserService) {
    this.userName = userService.getLoggedInUsername();
  }

  ngOnInit() {
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
        Storage.remove(photo.filename).then(() => {
        });
      }
    }
  }

}
