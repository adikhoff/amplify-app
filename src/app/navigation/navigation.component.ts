import {Component, Input} from '@angular/core';
import {UserService} from "../service/user-service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() isFooter: boolean = false;
  @Input() signout: Function = () => {};

  constructor(
    public userService: UserService
  ) {}

}
