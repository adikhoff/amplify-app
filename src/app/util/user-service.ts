import {Injectable} from '@angular/core';
import {Auth, Hub} from "aws-amplify";
import {APIService, CreateProfileInput, Profile, UpdateProfileInput} from "../API.service";

@Injectable()
export class UserService {
  public user: any;
  public username?: string;
  public currentProfile?: Profile;
  public allProfiles?: Profile[];

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
      this.username = user.username;
      console.log("userName found", this.username);
      this.getProfileForUser(user).then(profile => {
        console.log("profile found", profile);
        this.currentProfile = profile;
      });
      this.getAllProfiles().then(profiles => {
        this.allProfiles = profiles;
      });
    })
  }

  private onAuthEvent(payload: any) {
    console.log("payload", payload);
    if (payload.event === 'signOut') {
      console.log("Removing credentials from this device");
      this.user = undefined;
      this.username = undefined;
      this.currentProfile = undefined;
    }

    if (payload.event === 'signIn') {
      this.setupCredentials();
    }
  }

  public getProfileByUsername(username: string) {
    const results = this.allProfiles?.filter(p => p.username === username);
    if (results?.length === 1) {
      return results[0];
    } else {
      throw Error("Unexpected number of results from getProfileByUsername(" + username + "): " + results?.length);
    }
  }

  private async getAllProfiles(): Promise<Profile[]> {
    return new Promise((resolve, reject) => {
      this.api.ListProfiles({}, 1000).then(profiles => {
        resolve(profiles.items as Profile[]);
      });
    });
  }

  private async getProfileForUser(user: any): Promise<Profile> {
    return new Promise((resolve, reject) => {
      this.api.ListProfiles({username: {eq: user.username}}).then(profiles => {
        let profile = profiles.items[0] as Profile;
        const displayname = user.attributes.name ? user.attributes.name : user.username;
        if (profile) {
          // if (profile.displayname) {
          //   resolve(profile);
          // } else {
            const upi: UpdateProfileInput = {
              id: profile.id,
              displayname: displayname
            }
            this.api.UpdateProfile(upi);
            profile.displayname = displayname;
            resolve(profile);
          // }
        } else {
          const cpi: CreateProfileInput = {
            username: user.username,
            displayname: displayname,
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
