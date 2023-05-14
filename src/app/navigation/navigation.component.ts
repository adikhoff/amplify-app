import {Component, HostListener, Input, OnInit} from '@angular/core';
import {UserService} from "../service/user-service";
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() isFooter: boolean = false;
  public showUserDropdown = false;
  public showLegalDropdown = false;

  constructor(
    public userService: UserService,
    public router: Router
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showUserDropdown = false;
        this.showLegalDropdown = false;
      }
    });
  }

  @Input() signout: Function = () => {
  };

  ngOnInit() {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollOffset >= 100) {
      document.querySelectorAll('.topmenu').forEach((c) => {
        c.classList.add('scrolling');
      });
    } else {
      document.querySelectorAll('.topmenu').forEach((c) => {
        c.classList.remove('scrolling');
      });
    }
  }

}
