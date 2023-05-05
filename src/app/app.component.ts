import { Component } from '@angular/core';
import {UserService} from "./util/user-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplify-app';

  constructor(
    public userService: UserService
  ){}
}
