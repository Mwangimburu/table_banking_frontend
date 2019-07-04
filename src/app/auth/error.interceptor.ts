import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 // import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
         /*   if (err.status === 401) {
                console.log('Interceptor 401: ', err);

                // auto logout if 401 response returned from api
                this.authenticationService.logout();
               // location.reload(true);
            }
            if (err.status === 403) {
                    console.log('Interceptor 403: ', err);
                    this.authenticationService.logout();
                    // location.reload(true);
            }*/
            if (err.status === 500) {
                    console.log('Interceptor 500: ', err);
                    return throwError(err);
            }
            if (err.status === 422) {
                const errorData = err.error.errors;
                console.log('Interceptor - Main: ', err);
                return throwError(errorData);
            }
            if (err.status === 429) {
                // Too Many Requests
                const errorData = err.error.errors;
                console.log('Interceptor - Main: ', err);
                return throwError(errorData);
            }
            return throwError(err);

        }));
    }
}
