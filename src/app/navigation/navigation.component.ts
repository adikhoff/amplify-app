import {Component, Input} from '@angular/core';
import {UserService} from "../util/user-service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() isFooter: boolean = false;

  constructor(
    public userService: UserService
  ) {}

}
