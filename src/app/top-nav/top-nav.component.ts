import { Component, Input, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { User } from '../core/authentication/user.model';
// Ngrx Store
import { Store } from "@ngrx/store";
import * as fromStore from "../core/store";
import { Observable } from 'rxjs';


@Component({
    selector: 'mcb-top-nav',
    templateUrl: 'top-nav.html',
    styleUrls: ['top-nav.css']
})
export class TopNavComponent implements OnDestroy {
    @Input() sideNavRef: MatSidenav;

    user$: Observable<User>;

    isUserLoggedIn$: Observable<boolean>;

    NO_LOGIN_ROUTES: Array<string> = ["/login", "/"];

    constructor(private authService: AuthenticationService,
        private router: Router,
        private store: Store<fromStore.DataState>) {

        this.user$ = this.store.select(fromStore.getUser);
        this.isUserLoggedIn$ = this.store.select(fromStore.getLoggedIn);
    }

    disconnect() {
        this.authService.disconnect();
    }

    login() {
        // Redirect to login window.
        this.router.navigateByUrl('/login');
    }

    ngOnDestroy() {
        this.authService.currentUserChanged.unsubscribe();
    }

    private canDisplayLogin(): boolean {
        return this.NO_LOGIN_ROUTES.indexOf(this.router.url) === -1;
    }
}
