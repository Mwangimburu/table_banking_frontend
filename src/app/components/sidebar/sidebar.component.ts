import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Login, Logout } from '../../auth/auth.actions';
import { AppState } from '../../reducers';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';
import { tap } from 'rxjs/operators';
import { settings } from '../../auth/auth.selectors';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    permission?: any;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', permission: ['create-branch'] },
    /*{ path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon: 'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    { path: '/branches', title: 'Branches',  icon: 'business', class: '' },*/
    { path: '/expenses', title: 'Expenses',  icon: 'local_airport', class: '', permission: ['delete-branch'] },
    { path: '/members', title: 'Members',  icon: 'people', class: '', permission: ['delete-branch'] },
    /*{ path: '/borrowers', title: 'Borrowers',  icon: 'people', class: '', permission: ['create-branch'] },
    { path: '/guarantors', title: 'Guarantors',  icon: 'people', class: '', permission: ['create-branch'] },*/
    { path: '/loans', title: 'Loans -  Active',  icon: 'business', class: '', permission: ['create-branch'] },
    { path: '/loan-applications', title: 'Loan Applications',  icon: 'attach_file', class: '', permission: ['create-branch'] },
    { path: '/payments', title: 'Payments',  icon: 'attach_money', class: '', permission: ['create-branch'] },

    { path: '/settings', title: 'Setting',  icon: 'settings', class: '', permission: ['create-branch'] },

    { path: '/accounts', title: 'Accounting',  icon: 'account_tree', class: '', permission: ['create-branch'] },
    { path: '/reports', title: 'Reports',  icon: 'bar_chart', class: '', permission: ['create-branch'] },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  loading = false;

  businessName: string;

  currentSettings$: any;

  constructor(private auth: AuthenticationService, private router: Router, private store: Store<AppState>) {
      this.currentSettings$ = this.store.pipe(select(settings));
  }

  ngOnInit() {
     // this.store.pipe(select(settings)).subscribe(res => this.businessName = res.business_name);
    //  this.currentSettings$ = this.store.pipe(select(settings));
    //  this.currentSettings$.subscribe(res => this.businessName = res.business_name);
    /*  console.log('currentSettings$');
      console.log(currentSettings$);*/
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  logout() {
    //  this.store.dispatch(new Logout());
      this.loading = true;
      this.auth.logout()
          .pipe(tap(
              user => {
                  this.loading = false;
                  this.store.dispatch(new Logout());
              }
          ))
          .subscribe(
              () => {},
              (error) => {
                  this.store.dispatch(new Logout());
                  if (error.error.message) {
                    //  this.loginError = error.error.message;
                  } else {
                     // this.loginError = 'Server Error. Please try again later.';
                  }
                  this.loading = false;
              });
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
