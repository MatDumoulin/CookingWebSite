import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private authService: AuthenticationService = null; // Got to load it async to prevent circular import.

    constructor(private localStorageService: LocalStorageService,
        private logger: LoggerService,
        private router: Router,
        private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.authService) {
            this.authService = this.injector.get(AuthenticationService);
        }
        // Request are immutable. We must clone them to modify them.
        if (this.localStorageService.get("auth_token")) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.localStorageService.get("auth_token")}`
                }
            });
        }

        return next.handle(request).pipe(
            tap(() => { }, (err: any) => {
                // Handling 401 unauthorized errors.
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        // Making sure everything is disconnected properly.
                        this.authService.clearSession();
                        this.logger.error("Veuillez vous connecter pour effectuer cette action.", "J'ai compris");
                        this.router.navigateByUrl('/login');
                    }
                }
            })
        );
    }
}
