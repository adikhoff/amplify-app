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
      user: "user",
      photoId: "id",
      photo: this.getMockPhoto(),
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
      user: "user",
      createdAt: "",
      updatedAt: ""
    }
  }

}
