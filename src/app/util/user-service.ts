import {Injectable, OnInit} from '@angular/core';
import {Auth} from "aws-amplify";
import {APIService, CreateProfileInput, Profile} from "../API.service";

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  private user?: any;
  private currentProfile?: Profile;

  constructor(private api: APIService) {
  }

  ngOnInit() {
  }

  public async getProfileForUser(user: any): Promise<Profile> {
    return new Promise((resolve, reject) => {
      this.api.ListProfiles({name: {eq: user.userName}}).then(profiles => {
        let profile = profiles.items[0] as Profile;
        if (profile) {
          resolve(profile);
        } else {
          const cpi: CreateProfileInput = {
            name: user.username,
            email: user.attributes.email
          }
          this.api.CreateProfile(cpi).then(profile => {
            this.currentProfile = profile as Profile;
            resolve(this.currentProfile);
          }).catch(err => reject(err));
        }
      });
    });
  }

  public async getCurrentLoggedinUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.user) {
        resolve(this.user);
      } else {
        Auth.currentAuthenticatedUser().then(user => {
          this.user = user;
          resolve(this.user);
        }).catch(err => reject(err));
      }
    });
  }

  public async getLoggedInUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.user) {
        resolve(this.user.username);
      } else {
        this.getCurrentLoggedinUser().then(user => {
          resolve(user.username);
        }).catch(err => reject(err));
      }
    })
  }

  public async getCurrentLoggedinProfile(): Promise<Profile> {
    if (this.currentProfile) {
      return Promise.resolve(this.currentProfile);
    } else {
      return new Promise((resolve, reject) => {
        this.getCurrentLoggedinUser().then(user => {
          resolve(this.getProfileForUser(user));
        });
      });
    }
  }

}
