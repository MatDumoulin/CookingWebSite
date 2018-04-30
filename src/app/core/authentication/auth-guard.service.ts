import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthenticationService,
        private logger: LoggerService) { }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        else {
            this.logger.info("Veuillez vous connecter avant d'accéder à cette page.");
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
