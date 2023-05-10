import {Component, Input, OnInit} from '@angular/core';
import {Profile} from "../API.service";
import {MockService} from "../service/mock-service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  constructor(private mockService: MockService) {}
  @Input() forUser: Profile = this.mockService.getMockProfile();
}
