import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      {
        path: 'branches',
        loadChildren: './branches/branch.module#BranchModule',
        canActivate: [AuthGuard]
       // loadChildren: () => import('./branches/branch.module').then(m => m.BranchModule),
      },
      {
        path: 'payments',
        loadChildren: './payments/payment.module#PaymentModule'
      },
      {
        path: 'loans',
        loadChildren: './loans/loan.module#LoanModule'
      },
      {
        path: 'settings',
        loadChildren: './settings/setting.module#SettingModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
