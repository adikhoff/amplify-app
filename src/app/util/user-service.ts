import {Injectable, OnInit} from '@angular/core';
import {Auth} from "aws-amplify";
import {APIService, CreateProfileInput, Profile} from "../API.service";

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  private user: any;
  private profile: Profile | undefined;

  constructor(private api: APIService) {
  }

  ngOnInit() {
  }

  configure() {
    Auth.currentAuthenticatedUser().then(user => {
      console.log("user found", user);
      this.user = user;
      this.profile = this.getProfileForUser(user);
    });
  }

  public getProfileForUser(user: any): Profile | undefined {
    let foundProfile = undefined;
    this.api.ListProfiles({name: {eq: user.username}}).then((profiles) => {
      let profile = profiles.items[0] as Profile;
      if (profile) {
        foundProfile = profile;
      } else {
        const cpi: CreateProfileInput = {
          name: user.username,
          email: user.attributes.email
        }
        this.api.CreateProfile(cpi).then(profile => {
          foundProfile = profile as Profile;
        });
      }
    });
    return foundProfile;
  }

  public getCurrentLoggedinUser(): string {
    return this.user;
  }

  public getLoggedInUsername(): string {
    return this.user.username;
  }

  public getCurrentLoggedinProfile(): Profile | undefined {
    return this.profile;
  }

}
