import {EventEmitter, Injectable} from '@angular/core';
import {Auth} from "aws-amplify";
import {APIService, CreateProfileInput, Profile, UpdateProfileInput} from "../API.service";
import {Subject, filter, map, Observable, BehaviorSubject} from "rxjs";

@Injectable()
export class UserService {
  public user: any;
  public username?: string;
  public currentProfile?: Profile;
  private allProfiles$: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);

  constructor(private api: APIService) {
    this.loadAllProfiles();
    this.setupCredentials();
  }

  public loadAllProfiles() {
    this.api.ListProfiles().then(result => {
      console.log("Loading allprofiles observable ", result.items);
      this.allProfiles$.next(result.items as Profile[]);
    })
  }

  public async setupCredentials() { //TODO: change all this to a subscribe model
    this.user = await Auth.currentAuthenticatedUser();
    console.log("user found", this.user);
    this.username = this.user.username;
    console.log("userName found", this.username);
    this.currentProfile = await this.getProfileForUser(this.user);
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

  get allProfiles(): Subject<Profile[]> {
    return this.allProfiles$;
  }

}
