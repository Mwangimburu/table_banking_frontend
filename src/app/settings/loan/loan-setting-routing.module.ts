import { Routes, RouterModule } from '@angular/router';
import { LoanSettingComponent } from './loan-setting.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: LoanSettingComponent,
        children: [
            {
                path: '',
                loadChildren: 'app/settings/loan/source/loan-source-setting.module#LoanSourceSettingModule'
            },
            /*{
                path: 'source',
                loadChildren: 'app/settings/loan/source/loan-source-setting.module#LoanSourceSettingModule'
            },*/
            {
                path: 'type',
                loadChildren: 'app/settings/loan/type/loan-type-setting.module#LoanTypeSettingModule'
            },
            {
                path: 'status',
                loadChildren: 'app/settings/loan/status/loan-status-setting.module#LoanStatusSettingModule'
            }
        ]
    }
];

export const LoanSettingRoutingModule = RouterModule.forChild(ROUTES);
