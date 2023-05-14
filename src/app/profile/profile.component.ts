import {Component} from '@angular/core';
import {UserService} from "../service/user-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(
    public userService: UserService,
  ) {}

}
