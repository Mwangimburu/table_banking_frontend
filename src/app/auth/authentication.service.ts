import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';
import { API_URLS } from '../../assets/config/api-url';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    storageKey = 'be3295963d1091720c8513f78f83c216332190ff714a5239c8b49190443be288';

  //  private readonly apiUrl = 'http://localhost/19/dan/smartmicro/public/api/v1';
   // private readonly apiUrl = 'http://africomit.co.ke/backend/api/v1';

    private readonly apiUrl: string;

    constructor(private http: HttpClient, private router: Router) {
        this.apiUrl = environment.production ?  API_URLS.prod : API_URLS.dev;

        console.log('this.apiUrl');
        console.log(this.apiUrl);
    }

    /**
     * Login api user and setup token for future use
     * @param username
     * @param password
     */
    login(username: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}/login`, {email: username, password})
            .pipe(map((user) => {
                const decodedToken = jwt_decode(user.access_token);
              //  console.log('decodedToken');
              //  console.log(decodedToken);
                user.scope = decodedToken.scopes;
                return user;
            }));
    }

    /**
     *  Logout API level
     */
    logout() {
        return this.http.get<any>(`${this.apiUrl}/logout`)
            .pipe(map((data) => {
            }));
    }

    /**
     * Details of logged in user
     */
    me() {
        return this.http.get<any>(`${this.apiUrl}/me`);
    }
}
