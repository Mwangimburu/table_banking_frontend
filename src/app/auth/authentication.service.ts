import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppConfigService } from '../shared/app.config-service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    storageKey = 'be3295963d1091720c8513f78f83c216332190ff714a5239c8b49190443be288';

    private readonly apiUrl = AppConfigService.settings.apiUrl;
  //  private readonly apiUrl = '';

    constructor(private http: HttpClient, private router: Router) { }

    /**
     * Login api user and setup token for future use
     * @param username
     * @param password
     */
    login(username: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}/login`, { email: username, password })
            .pipe(map((user) => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    this.setToken(user.access_token);
                }

                return user;
            }));
    }

    /**
     * Save access_token for login persistence
     * @param token
     */
    setToken(token: string) {
        localStorage.setItem(this.storageKey, token);
    }

    /**
     * Fetch available access token
     */
    getToken() {
        return localStorage.getItem(this.storageKey);
    }

    /**
     * Delete access token from client side
     */
    removeToken() {
        localStorage.removeItem(this.storageKey);
    }

    /**
     * Check if user is set
     */
    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }

    /**
     * Details of logged in user
     */
    me() {
        return this.http.get<any>(`${this.apiUrl}/me`);
    }

    /**
     * Remove access token, revoke its access in server
     */
    logout() {
        if (this.getToken() !== null) {

            this.http.get<any>(`${this.apiUrl}/logout`)
                .subscribe((res) => {
                    this.removeToken();
                    return this.router.navigate(['/auth/login']);
                }, (error) => {
                    this.removeToken();

                    console.log('Not today');
                });

        } else {
            // this.removeToken();
            console.log('Already out');
            // location.reload(true);
            return this.router.navigate(['/auth/login']);
        }
    }
}
