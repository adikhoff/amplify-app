import {Injectable} from '@angular/core';
import {Auth, Hub} from "aws-amplify";
import {APIService, CreateProfileInput, Profile} from "../API.service";

@Injectable()
export class UserService {
  public user: any;
  public userName?: string;
  public currentProfile?: Profile;

  constructor(private api: APIService) {
    Hub.listen('auth', (data) => {
      const {payload} = data;
      this.onAuthEvent(payload);
      console.log('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);
    });
    this.setupCredentials();
  }

  private setupCredentials() {
    console.log("constructor");
    this.getCurrentLoggedinUser().then(user => {
      this.user = user;
      console.log("user found", this.user);
      this.userName = user.username;
      console.log("userName found", this.userName);
      this.getProfileForUser(user).then(profile => {
        console.log("profile found", profile);
        this.currentProfile = profile;
      });
    })
  }

  private onAuthEvent(payload: any) {
    console.log("payload", payload);
    if (payload.event === 'signOut') {
      console.log("Removing credentials from this device");
      this.user = undefined;
      this.userName = undefined;
      this.currentProfile = undefined;
    }

    if (payload.event === 'signIn') {
      this.setupCredentials();
    }
  }

  public async getProfileForUser(user: any): Promise<Profile> {
    return new Promise((resolve, reject) => {
      this.api.ListProfiles({name: {eq: user.username}}).then(profiles => {
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

  private async getCurrentLoggedinUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser().then(user => {
        resolve(user);
      }).catch(err => reject(err));
    });
  }

}
