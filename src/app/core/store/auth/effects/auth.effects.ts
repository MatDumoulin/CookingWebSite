import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "angular-2-local-storage";
// Moment
import * as moment from 'moment';
// Ngrx
import { Store } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";
import { LOGGED_IN, LOG_OUT, LOGGED_OUT, LoggedIn} from "../actions";
import { ClearUserData } from "../../recipes/actions";
import { DataState } from "../../store-state";
// Rxjs
import { tap } from "rxjs/operators";
// Auth service (to interact with federate log in providers)
import { AuthenticationService } from '../../../authentication/authentication.service';


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private localStorageService: LocalStorageService,
        private router: Router,
        private store: Store<DataState>
    ) {}

    /**
     * When a user logs in, cache its data.
     */
    @Effect({ dispatch: false })
    loggedIn$ = this.actions$
        .ofType(LOGGED_IN)
        .pipe(
            tap((action) => {
                const authResult = (action as LoggedIn).payload;
                const expiresAt = moment().add(authResult.tokenExpiresIn, 'second');
                this.localStorageService.set("user", authResult.user );
                this.localStorageService.set('auth_token', authResult.token);
                this.localStorageService.set("token_expires_at", JSON.stringify(expiresAt.valueOf()) );
                // Redirect the user to its home page.
                this.router.navigateByUrl('/recipes');
            })
        );

    /**
     * When a user logs out, clear all of its client side data.
     */
    @Effect({ dispatch: false })
    logOut$ = this.actions$
        .ofType(LOG_OUT)
        .pipe(
            tap(() => {
                this.authService.disconnect();
            })
        );

    /**
     * When a user logs out, clear all of its client side data.
     */
    @Effect({ dispatch: false })
    loggedOut$ = this.actions$
        .ofType(LOGGED_OUT)
        .pipe(
            tap(() => {
                this.localStorageService.remove("user", "auth_token", "token_expires_at");
                // Clearing all loaded data from app.
                this.store.dispatch(new ClearUserData());
                this.router.navigateByUrl('/login');
            })
        );
}
