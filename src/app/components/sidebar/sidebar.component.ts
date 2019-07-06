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
    { path: '/members', title: 'Members',  icon: 'people', class: '', permission: ['delete-branch'] },
    { path: '/borrowers', title: 'Borrowers',  icon: 'people', class: '', permission: ['create-branch'] },
    { path: '/guarantors', title: 'Guarantors',  icon: 'people', class: '', permission: ['create-branch'] },
    { path: '/loans', title: 'Loans',  icon: 'business', class: '', permission: ['create-branch'] },
    { path: '/loan-applications', title: 'Loan Applications',  icon: 'business', class: '', permission: ['create-branch'] },
    { path: '/payments', title: 'Payments',  icon: 'attach_money', class: '', permission: ['create-branch'] },
    { path: '/settings', title: 'Setting',  icon: 'settings', class: '', permission: ['create-branch'] },
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
