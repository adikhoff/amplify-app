import {Component, Input, OnInit} from '@angular/core';
import {PhotoUrl} from "../../model/photo-url";
import {APIService, CreateLikeInput, DeleteLikeInput, Like, Photo} from "../../API.service";
import {UserService} from "../../service/user-service";
import {MockService} from "../../service/mock-service";

@Component({
  selector: 'app-like-counter',
  templateUrl: './like-counter.component.html',
  styleUrls: ['./like-counter.component.css']
})
export class LikeCounterComponent implements OnInit {
  @Input() photoUrl: PhotoUrl = this.mockService.getMockPhotoUrl();

  private user: any;
  private likeClicked?: Photo = undefined;

  constructor(private api: APIService, private userService: UserService, private mockService: MockService) {
  }

  ngOnInit() {
  }

  public alreadyLiked(): boolean {
    if (this.userService.username) {
      if (this.photoUrl?.photo === this.likeClicked) {
        return true;
      }
      if (!this.photoUrl?.photo.likes?.items) return false;
      const search = this.photoUrl.photo.likes?.items.filter((item) => item?.username === this.userService.username);
      return search?.length !== 0;
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
    if (this.userService.username) {
      const currentLike: Like | null | undefined = photo.likes?.items.filter((item) => item?.username === this.userService.username)[0];
      if (currentLike) {
        const dli: DeleteLikeInput = {
          id: currentLike.id
        }
        this.api.DeleteLike(dli).then((like) => {
        });
      }
    }
  }

  private increaseLikes(photo: Photo) {
    if (this.userService.username) {
      this.simulateScoreIncrease(photo);
      if (photo.likes?.items === undefined || photo.likes?.items.filter((item) => item?.username === this.userService.username).length == 0) {
        const cli: CreateLikeInput = {
          username: this.userService.username,
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
