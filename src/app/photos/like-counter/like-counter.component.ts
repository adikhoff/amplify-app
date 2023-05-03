import {Component, Input, OnInit} from '@angular/core';
import {PhotoUrl} from "../../model/photo-url";
import {APIService, CreateLikeInput, DeleteLikeInput, Like, Photo, Profile} from "../../API.service";
import {UserService} from "../../util/user-service";
import {MockService} from "../../util/mock-service";

@Component({
  selector: 'app-like-counter',
  templateUrl: './like-counter.component.html',
  styleUrls: ['./like-counter.component.css']
})
export class LikeCounterComponent implements OnInit {
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

  private user: any;
  private userName?: string;
  private likeClicked?: Photo = undefined;

  constructor(private api: APIService, private userService: UserService, private mockService: MockService) {
  }

  ngOnInit() {
    this.userService.getLoggedInUsername().then(name => {
      this.userName = name;
    });
  }

  public alreadyLiked(): boolean {
    if (this.userName) {
      if (this.photoUrl?.photo === this.likeClicked) {
        return true;
      }
      if (!this.photoUrl?.photo.likes?.items) return false;
      const search = this.photoUrl.photo.likes?.items.filter((item) => item?.user === this.userName);
      return search.length != 0
    }
    return false;
  }

  public onHeartClicked(photo: Photo) {
    if (!this.alreadyLiked()) {
      this.increaseLikes(photo);
    } else {
      this.decreaseLikes(photo);
    }
  }

  private decreaseLikes(photo: Photo) {
    this.likeClicked = undefined;
    const currentLike: Like | null | undefined = photo.likes?.items.filter((item) => item?.user === this.userName)[0];
    if (currentLike) {
      const dli: DeleteLikeInput = {
        id: currentLike.id
      }
      this.api.DeleteLike(dli).then((like) => {
      });
    }
  }

  private increaseLikes(photo: Photo) {
    if (this.userName) {
      this.simulateScoreIncrease(photo);
      if (photo.likes?.items === undefined || photo.likes?.items.filter((item) => item?.user === this.userName).length == 0) {
        const cli: CreateLikeInput = {
          user: this.userName,
          photoId: photo.id,
          photoLikesId: photo.id
        }
        this.api.CreateLike(cli).then(() => {
        });
      }
    }
  }

  private simulateScoreIncrease(photo: Photo) {
    this.likeClicked = photo;
    const like: Like = this.mockService.getMockLike();
    photo.likes?.items.push(like);
  }

}
