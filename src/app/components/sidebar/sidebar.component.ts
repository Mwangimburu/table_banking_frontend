import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '../../auth/auth.actions';
import { AppState } from '../../reducers';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon: 'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    { path: '/branches', title: 'Branches',  icon: 'business', class: '' },
    { path: '/members', title: 'Members',  icon: 'people', class: '' },
    { path: '/borrowers', title: 'Borrowers',  icon: 'people', class: '' },
    { path: '/guarantors', title: 'Guarantors',  icon: 'people', class: '' },
    { path: '/loans', title: 'Loans',  icon: 'business', class: '' },
    { path: '/loan-applications', title: 'Loan Applications',  icon: 'business', class: '' },
    { path: '/payments', title: 'Payments',  icon: 'attach_money', class: '' },
    { path: '/settings', title: 'Setting',  icon: 'settings', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  logout() {
      this.store.dispatch(new Logout());
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
