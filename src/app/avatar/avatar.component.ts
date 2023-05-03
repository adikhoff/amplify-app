import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../util/user-service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  @Input() user: string = ""
}
