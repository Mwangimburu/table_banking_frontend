import { Routes, RouterModule } from '@angular/router';
import { BranchSettingComponent } from './branch-setting.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: BranchSettingComponent,
        children: [
            {
                path: '',
                loadChildren: 'app/settings/branch/general/branch-general-setting.module#BranchGeneralSettingModule'
            },
            /*{
                path: 'general',
                loadChildren: 'app/settings/company/general/company-general-setting.module#CompanyGeneralSettingModule'
            },*/
        ]
    }
];

export const BranchSettingRoutingModule = RouterModule.forChild(ROUTES);
