import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from './../../../environments/environment';
import { GoogleAuthenticationService } from './google-authentication/google-authentication.service';
import { User } from './user.model';
// Ngrx Store
import { Store } from "@ngrx/store";
import * as fromStore from "../../core/store";

@Injectable()
export class AuthenticationService {
  currentUserChanged: Subject<any> = new Subject();

  constructor(private googleAuth: GoogleAuthenticationService,
              private localStorageService: LocalStorageService,
              private store: Store<fromStore.DataState>,
              private zone: NgZone) {
  }

  onSignInWithGoogle(googleUser: any) {
    // We have to run this code inside of an Angular zone since the Google api callback does not run in Angular.
    this.zone.run(() => {
      this.googleAuth.onSignedIn(googleUser).subscribe((response: any) => {
        this.store.dispatch(new fromStore.LoggedIn(response));
      });
    });
  }

  disconnect() {
    this.googleAuth.disconnect().then(() => {
      // We have to run this code inside of an Angular zone since the Google api callback does not run in Angular.
      this.zone.run(() => {
        this.store.dispatch(new fromStore.LoggedOut());
      });
    });
  }

/*   isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  } */

  getExpiration() {
      const expiration: string = this.localStorageService.get("token_expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }

  getCurrentUser(): User {
    return this.localStorageService.get("user");
  }
}
