import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { accessToken, isLoggedIn } from './auth.selectors';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor( private store: Store<AppState>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       // const currentToken = JSON.parse(this.auth.getToken());
       // const currentToken = this.auth.getToken();
        const currentToken$ = this.store.pipe(select(accessToken));

      //  console.log('Token');
      //  console.log(currentToken$);

        if (currentToken$) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentToken$}`
                }
            });
        }

        return next.handle(request);
    }
}
