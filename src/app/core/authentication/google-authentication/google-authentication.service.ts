import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

declare const gapi: any;

@Injectable()
export class GoogleAuthenticationService {
  private CLIENT_ID = "570370763529-lvcc421ainf71o88qm18i95ahn05hq39.apps.googleusercontent.com";

  constructor(private http: HttpClient) {
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      const auth = gapi.auth2.init({
        client_id: this.CLIENT_ID,
        cookie_policy: 'single_host_origin',
        scope: 'profile email'
      });
    });
  }

  onSignedIn(googleUser: any) {
    // We need to get a jwt from the server in order to access the database.
    const url = `${environment.apiUrl}/login`;
    const body = { googleToken: googleUser.getAuthResponse().id_token };
    return this.http.post(url, body);
  }

  /*interpretParams(googleUser:any) : User {
    const profile = googleUser.getBasicProfile();
    let user = new User();

    user.authId = profile.getId();
    user.email = profile.getEmail();
    user.firstName = profile.getGivenName();
    user.familyName = profile.getFamilyName();
    user.fullName = profile.getName();
    user.profilePicture = profile.getImageUrl();

    return user;
  }*/

  disconnect(): Promise<any> {
    return gapi.auth2.getAuthInstance().disconnect();
  }
}
