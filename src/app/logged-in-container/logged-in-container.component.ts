import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../service/user-service";
import {Auth} from "aws-amplify";
import {PhotoService} from "../service/photo-service";

@Component({
  selector: 'app-logged-in-container',
  templateUrl: './logged-in-container.component.html',
  styleUrls: ['./logged-in-container.component.css']
})
export class LoggedInContainerComponent implements OnInit {
  private SLEEP_THRESHOLD = 5000;

  public user: any;

  constructor(
    public userService: UserService,
    public photoService: PhotoService,
  ) {
  }

  @Input() signout: Function = () => {
  };

  async ngOnInit() {
    console.log("Init wakeup service...");
    this.initWakeupService();
    console.log("Waiting for user...");
    let user = await Auth.currentAuthenticatedUser();
    console.log("Found user, setup credentials", user);
    this.userService.setupCredentials();
    console.log("Set up credentials");
  }

  private initWakeupService() {
    let now = new Date().getTime();
    setInterval (() => {
      if ((new Date().getTime() - now) > this.SLEEP_THRESHOLD) {
        console.log ('wake-up from sleep detected');
        this.refreshCaches();
      }
      now = new Date().getTime();
    }, 1000);
  }

  private refreshCaches() {
    this.photoService.refresh();
  }
}
