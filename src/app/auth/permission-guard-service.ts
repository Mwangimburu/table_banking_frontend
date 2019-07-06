import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { allScopes } from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class PermissionGuardService implements CanLoad  {

    private currentUser;
    private permissions = [];

    constructor(private store: Store<AppState>, private router: Router) { }

    canLoad(route: Route): boolean {
        // this will be passed from the route config
        // on the data property
        const expectedPermission = route.data.expectedPermission;
        this.permissions = route.data.expectedPermission;
        const token = localStorage.getItem('token');
        // decode the token to get its payload
      //  const tokenPayload = decode(token);

        this.store.pipe(select(allScopes)).subscribe(user => {
            this.currentUser = user;
        });

        if (this.checkPermission()) {
            console.log('PermGuard.... has permission');
            return true;

        }

        console.log('PermGuard.... NO permission');
        this.router.navigate(['/login']);
        return false;
    }


    private checkPermission() {
        let hasPermission = false;

        if (this.currentUser && this.permissions !== undefined ) {
            for (const checkPermission of this.permissions) {
                const permissionFound = this.currentUser.find(x => x.toUpperCase() === checkPermission.toUpperCase());
                console.log('In checkPermission....permissionFound found?');
                console.log(permissionFound);
                if (permissionFound) {
                    hasPermission = true;
                }
            }
        }

        return hasPermission;
    }

}
