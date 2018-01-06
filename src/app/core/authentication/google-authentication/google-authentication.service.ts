import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model'
import { environment } from './../../../../environments/environment';

declare const gapi: any;

@Injectable()
export class GoogleAuthenticationService {
  private CLIENT_ID = "611116082789-nnb2ap65tvvfiq99nnve5oh8d6tksc2a.apps.googleusercontent.com";

  constructor(private http: HttpClient) {
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      let auth = gapi.auth2.init({
        client_id: this.CLIENT_ID,
        cookie_policy: 'single_host_origin',
        scope: 'profile email'
      });
    });
  }

  onSignedIn(googleUser:any) {
    // We need to get a jwt from the server in order to access the database.
    const url = `${environment.apiUrl}/login`;
    const body = { googleToken: googleUser.getAuthResponse().id_token };
    return this.http.post(url, body);
  }

  interpretParams(googleUser:any) : User {
    const profile = googleUser.getBasicProfile();
    let user = new User();

    user.id = profile.getId();
    user.email = profile.getEmail();
    user.firstName = profile.getGivenName();
    user.familyName = profile.getFamilyName();
    user.fullName = profile.getName();
    user.profilePicture = profile.getImageUrl();

    return user;
  }

  disconnect(): Promise<any> {
    return gapi.auth2.getAuthInstance().disconnect();
  }
}
