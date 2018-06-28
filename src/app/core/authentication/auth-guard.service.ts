import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoggerService } from '../logger/logger.service';
// Ngrx Store
import { Store } from "@ngrx/store";
import * as fromStore from "../../core/store/auth";
import { take } from 'rxjs/operators';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router,
        private store: Store<fromStore.AuthState>,
        private logger: LoggerService) { }

    canActivate() {
        let isLoggedIn = false;
        this.store.select(fromStore.getLoggedIn).pipe(take(1)).subscribe(loggedIn => {
            isLoggedIn = loggedIn;
        });

        if (!isLoggedIn) {
            this.logger.info("Veuillez vous connecter avant d'accéder à cette page.");
            this.router.navigateByUrl('/login');
        }

        return isLoggedIn;
    }
}
