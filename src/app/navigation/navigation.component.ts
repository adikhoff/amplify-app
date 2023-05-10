import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../service/user-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() isFooter: boolean = false;
  @Input() signout: Function = () => {
  };

  public showUserDropdown = false;

  constructor(
    public userService: UserService) {
  }

  menuClick() {
    this.showUserDropdown = false;
  }
}
