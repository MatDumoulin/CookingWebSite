import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from './../../../environments/environment';
import { GoogleAuthenticationService } from './google-authentication/google-authentication.service';
import { User } from './user.model';

@Injectable()
export class AuthenticationService {
  currentUserChanged: Subject<any> = new Subject();

  constructor(private googleAuth: GoogleAuthenticationService,
              private localStorageService: LocalStorageService,
              private router: Router,
              private zone: NgZone) {
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.tokenExpiresIn, 'second');
    this.localStorageService.set("user", authResult.user );
    this.localStorageService.set('auth_token', authResult.token);
    this.localStorageService.set("token_expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  public clearSession() {
    this.localStorageService.remove("user");
    this.localStorageService.remove('auth_token');
    this.localStorageService.remove('token_expires_at');
    // Clearing all loaded data from app.
  }

  onSignInWithGoogle(googleUser: any) {
    // We have to run this code inside of an Angular zone since the Google api callback does not run in Angular.
    this.zone.run(() => {
      this.googleAuth.onSignedIn(googleUser).subscribe((response: any) => {
        const currentUser = response.user;
        this.setSession(response);
        this.router.navigateByUrl('/recipes');
        this.currentUserChanged.next(currentUser);
      });

    });
  }

  disconnect() {
    this.googleAuth.disconnect().then(() => {
      // We have to run this code inside of an Angular zone since the Google api callback does not run in Angular.
      this.zone.run(() => {
        this.clearSession();
        this.router.navigateByUrl('/login');
        this.currentUserChanged.next(null);
      });
    });
  }

  isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration: string = this.localStorageService.get("token_expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }

  getCurrentUser(): User {
    return this.localStorageService.get("user");
  }
}
