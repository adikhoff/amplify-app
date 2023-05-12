import {Injectable} from '@angular/core';
import {Auth} from "aws-amplify";
import {APIService, CreateProfileInput, Profile, UpdateProfileInput} from "../API.service";

@Injectable()
export class UserService {
  public user: any;
  public username?: string;
  public currentProfile?: Profile;
  public allProfiles?: Profile[];

  constructor(private api: APIService) {
  }

  public async setupCredentials() { //TODO: change all this to a subscribe model
    this.user = await Auth.currentAuthenticatedUser();
    console.log("user found", this.user);
    this.username = this.user.username;
    console.log("userName found", this.username);
    this.currentProfile = await this.getProfileForUser(this.user);
    this.allProfiles = await this.getAllProfiles();
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
        let existingProfile = profiles.items[0] as Profile;
        const displayname = user.attributes.name ? user.attributes.name : user.username;
        if (existingProfile) {
          const upi: UpdateProfileInput = {
            id: existingProfile.id,
            displayname: displayname
          }
          this.api.UpdateProfile(upi);
          existingProfile.displayname = displayname;
          resolve(existingProfile);
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

}
