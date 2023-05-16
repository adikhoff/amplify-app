import {Component, Input} from '@angular/core';
import {Profile} from "../API.service";
import {MockService} from "../service/mock-service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  @Input() forUser: Profile = this.mockService.getMockProfile();

  constructor(private mockService: MockService) {
  }
}
