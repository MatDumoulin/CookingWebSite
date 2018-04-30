import { Component, Input, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { User } from '../core/authentication/user.model';



@Component({
    selector: 'mcb-top-nav',
    templateUrl: 'top-nav.html',
    styleUrls: ['top-nav.css']
})
export class TopNav implements OnDestroy {
    @Input() sideNavRef: MatSidenav;

    user: User = null;

    displayLogin = false;

    NO_LOGIN_ROUTES: Array<string> = ["/login", "/"];

    constructor(private authService: AuthenticationService,
        private router: Router) {
        // Listening to the current route to decide wheter we want to display the login/logout button or not.
        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationEnd) {
                this.displayLogin = this.canDisplayLogin();
            }
        });
        // Retrieving the currently connected user.
        this.authService.currentUserChanged.subscribe((currentUser) => {
            this.user = currentUser;
        });

        this.user = this.authService.getCurrentUser();
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
