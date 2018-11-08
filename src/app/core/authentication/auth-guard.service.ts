import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalStorageService } from "angular-2-local-storage";
import { LoggerService } from '../logger/logger.service';
// Ngrx Store
import { Store } from "@ngrx/store";
import * as fromStore from "../../core/store/auth";
import { take } from 'rxjs/operators';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router,
        private store: Store<fromStore.AuthState>,
        private localStorageService: LocalStorageService,
        private logger: LoggerService) { }

    canActivate() {
        let isLoggedIn = false;
        // First check in the store if the user is logged in.
        this.store.select(fromStore.getLoggedIn).pipe(take(1)).subscribe(loggedIn => {
            isLoggedIn = loggedIn;
        });

        // Here, we can't rely on the store as the source of thruth since when we first come to the website
        // the store is on a blank state. Instead, we check in the local storage.
/*         if (this.localStorageService.get("user")) {
            isLoggedIn = true;
        } */



        if (!isLoggedIn) {
            this.logger.info("Veuillez vous connecter avant d'accéder à cette page.");
            this.router.navigateByUrl('/login');
        }

        return isLoggedIn;
    }
}
