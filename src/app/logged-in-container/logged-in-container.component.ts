import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../service/user-service";
import {Auth} from "aws-amplify";

@Component({
  selector: 'app-logged-in-container',
  templateUrl: './logged-in-container.component.html',
  styleUrls: ['./logged-in-container.component.css']
})
export class LoggedInContainerComponent implements OnInit {
  @Input() signout: Function = () => {
  };

  public user: any;

  constructor(
    public userService: UserService
  ) {
  }

  async ngOnInit() {
    console.log("Waiting for user...");
    let user = await Auth.currentAuthenticatedUser();
    console.log("Found user, setup credentials", user);
    this.userService.setupCredentials();
    console.log("Set up credentials");
  }

}
