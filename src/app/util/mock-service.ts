import {Injectable, OnInit} from '@angular/core';
import {Auth} from "aws-amplify";
import {APIService, CreateProfileInput, Like, Photo, Profile} from "../API.service";
import {getPhoto} from "../../graphql/queries";

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

  public getMockPhoto(): Photo {
    return {
      __typename: "Photo",
      id: "mock",
      user: "user",
      createdAt: "",
      updatedAt: ""
    }
  }

}
