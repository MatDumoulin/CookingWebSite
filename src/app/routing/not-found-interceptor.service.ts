import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            tap(() => { }, (err: any) => {
                // Handling 401 unauthorized errors.
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 404) {
                        this.router.navigateByUrl('/notfound');
                    }
                }
            })
        );
    }
}
