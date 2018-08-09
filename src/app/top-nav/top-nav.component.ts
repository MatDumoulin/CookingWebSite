import { Component, Input, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
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
export class TopNavComponent {
    @Input() sideNavRef: MatSidenav;

    user$: Observable<User>;

    isUserLoggedIn$: Observable<boolean>;

    constructor(
        private router: Router,
        private store: Store<fromStore.DataState>) {

        this.user$ = this.store.select(fromStore.getUser);
        this.isUserLoggedIn$ = this.store.select(fromStore.getLoggedIn);
    }

    disconnect() {
        this.store.dispatch(new fromStore.LogOut());
    }

    login() {
        // Redirect to login window.
        this.router.navigateByUrl('/login');
    }
}
