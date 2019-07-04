import { Routes, RouterModule } from '@angular/router';
import { EmailSettingComponent } from './email-setting.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: EmailSettingComponent,
        children: [
            {
                path: '',
                loadChildren: 'app/settings/email/general/email-general-setting.module#EmailGeneralSettingModule'
            },
            /*{
                path: 'general',
                loadChildren: 'app/settings/email/general/email-general-setting.module#EmailGeneralSettingModule'
            },*/
        ]
    }
];

export const EmailSettingRoutingModule = RouterModule.forChild(ROUTES);
