import { Routes, RouterModule } from '@angular/router';
import { EmployeeSettingComponent } from './employee-setting.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: EmployeeSettingComponent,
        children: [
            {
                path: '',
                loadChildren: 'app/settings/employee/general/employee-general-setting.module#EmployeeGeneralSettingModule'
            },
            /*{
                path: 'general',
                loadChildren: 'app/settings/company/general/company-general-setting.module#CompanyGeneralSettingModule'
            },*/
        ]
    }
];

export const EmployeeSettingRoutingModule = RouterModule.forChild(ROUTES);
