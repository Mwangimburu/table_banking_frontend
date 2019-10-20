import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { PermissionGuardService as PermGuard } from './auth/permission-guard-service';
import { AppPreloadingStrategy } from './app-preloading-strategy';

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
        path: 'expenses',
        loadChildren: './expenses/expense.module#ExpenseModule',
        // loadChildren: () => import('./branches/branch.module').then(m => m.BranchModule),
        canActivate: [AuthGuard],
        data: { preload: true, delay: false },
      },
      {
        path: 'members',
        loadChildren: './members/member.module#MemberModule',
        data: { preload: true, delay: false },

      },
      {
        path: 'borrowers',
        loadChildren: './borrowers/borrower.module#BorrowerModule',
        data: { preload: false, delay: false },

      },
      {
        path: 'guarantors',
        loadChildren: './guarantors/guarantor.module#GuarantorModule',
        data: { preload: false, delay: false },

      },
      {
        path: 'payments',
        loadChildren: './payments/payment.module#PaymentModule',
        data: { preload: true, delay: true },

      },
      {
        path: 'reports',
        loadChildren: './reports/report.module#ReportModule',
        data: { preload: true, delay: true },

      },
      {
        path: 'accounts',
        loadChildren: './accounting/accounting.module#AccountingModule',
        data: { preload: true, delay: true },

      },
      {
        path: 'loan-applications',
        loadChildren: './loan-applications/loan-application.module#LoanApplicationModule',
        data: { preload: true, delay: true },

      },
      {
        path: 'loans',
        loadChildren: './loans/loan.module#LoanModule',
        data: { preload: true, delay: true },
      },
      {
        path: 'settings',
        loadChildren: './settings/setting.module#SettingModule',
        canLoad: [PermGuard],
        data: {
          expectedPermission: ['create-branch'],
          preload: true,
          delay: true
        }

      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
       useHash: false,
      preloadingStrategy: AppPreloadingStrategy
      // AppPreloadingStrategy : PreloadAllModules
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
