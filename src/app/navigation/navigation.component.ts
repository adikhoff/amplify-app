import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../service/user-service";
import {NavigationEnd, NavigationStart, Router, RouterEvent} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() isFooter: boolean = false;
  @Input() signout: Function = () => {
  };

  public showUserDropdown = false;

  constructor(
    public userService: UserService,
    public router: Router
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log("event", event);
        if (event.url != "/profile") {
          this.showUserDropdown = false;
        }
      }
    });
  }

  ngOnInit() {
  }

}
