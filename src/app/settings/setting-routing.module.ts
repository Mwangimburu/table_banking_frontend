import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { GeneralSettingResolverService } from './general/data/general-setting-resolver.service';
export const ROUTES: Routes = [
    {
        path: '',
        component: SettingComponent,
        children: [
            {
                path: '',
                loadChildren: 'app/settings/general/general-setting.module#GeneralSettingModule',
                resolve : { setting: GeneralSettingResolverService}
            },
            {
                path: 'borrower',
                loadChildren: 'app/settings/borrower/borrower-setting.module#BorrowerSettingModule'
            },
            {
                path: 'branch',
                loadChildren: 'app/settings/branch/branch-setting.module#BranchSettingModule'
            },
            {
                path: 'employee',
                loadChildren: 'app/settings/employee/employee-setting.module#EmployeeSettingModule'
            },
           {
                path: 'email',
                loadChildren: 'app/settings/email/email-setting.module#EmailSettingModule'
            },
            /*{
               path: 'expense',
               loadChildren: 'app/settings/expense/expense-setting.module#ExpenseSettingModule'
           },*/
            {
                path: 'general',
                loadChildren: 'app/settings/general/general-setting.module#GeneralSettingModule'
            },
            /*{
                path: 'invoice',
                loadChildren: 'app/settings/invoice/invoice-setting.module#InvoiceSettingModule',
                resolve : { setting: GeneralInvoiceSettingResolverService}

            },*/
            {
                path: 'loan',
                loadChildren: 'app/settings/loan/loan-setting.module#LoanSettingModule'
            },
            {
                path: 'payment',
                loadChildren: 'app/settings/payment/payment-setting.module#PaymentSettingModule'
            },
            /* {
                 path: 'quote',
                 loadChildren: 'app/settings/quote/quote-setting.module#QuoteSettingModule',
                 resolve : { setting: GeneralQuoteSettingResolverService}

             },
             {
                 path: 'tax',
                 loadChildren: 'app/settings/tax/tax-setting.module#TaxSettingModule'
             },
             {
                 path: 'ticket',
                 loadChildren: 'app/settings/ticket/ticket-setting.module#TicketSettingModule'
             },*/
            {
                path: 'user',
                loadChildren: 'app/settings/user/user-setting.module#UserSettingModule'
            }
        ]
    }
];

export const SettingRoutingModule = RouterModule.forChild(ROUTES);
