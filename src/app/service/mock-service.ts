import {Injectable, OnInit} from '@angular/core';
import {Auth} from "aws-amplify";
import {APIService, CreateProfileInput, Like, Photo, Profile} from "../API.service";
import {getPhoto} from "../../graphql/queries";
import {PhotoUrl} from "../model/photo-url";

@Injectable({
  providedIn: 'root',
})
export class MockService implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  public getMockLike(): Like {
    return {
      __typename: "Like",
      id: "mock",
      username: "username",
      photoId: "id",
      createdAt: "",
      updatedAt: "",
      photoLikesId: "id",
    }
  }

  getMockPhotoUrl(): PhotoUrl {
    return {
      photo: this.getMockPhoto(),
      url: "url"
    }
  }

  public getMockPhoto(): Photo {
    return {
      __typename: "Photo",
      id: "mock",
      filename: "name",
      username: "username",
      dateIndex: "",
      createdAt: "",
      updatedAt: ""
    }
  }

  public getMockProfile(): Profile {
    return {
      __typename: "Profile",
      id: "mock",
      username: "username",
      displayname: "displayname",
      email: "email",
      createdAt: "",
      updatedAt: ""
    }
  }

}
