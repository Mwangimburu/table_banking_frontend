import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppConfigService } from '../shared/app.config-service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    storageKey = 'be3295963d1091720c8513f78f83c216332190ff714a5239c8b49190443be288';

   // private readonly apiUrl = AppConfigService.settings.apiUrl;
    private readonly apiUrl = 'http://localhost/19/dan/smartmicro/public/api/v1';

    constructor(private http: HttpClient, private router: Router) { }

    /**
     * Login api user and setup token for future use
     * @param username
     * @param password
     */
    login(username: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}/login`, { email: username, password })
            .pipe(map((user) => {
                return user;
            }));
    }

    /**
     * Details of logged in user
     */
    me() {
        return this.http.get<any>(`${this.apiUrl}/me`);
    }
}
