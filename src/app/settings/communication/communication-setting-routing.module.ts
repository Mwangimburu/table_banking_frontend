import { Routes, RouterModule } from '@angular/router';
import { CommunicationSettingComponent } from './communication-setting.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: CommunicationSettingComponent,
        children: [
            /*{
                path: '',
                loadChildren: 'app/settings/communication/source/loan-source-setting.module#LoanSourceSettingModule'
            },*/
            {
                path: '',
                loadChildren: 'app/settings/communication/email/email-setting.module#EmailSettingModule'
            },
           {
                path: 'email',
                loadChildren: 'app/settings/communication/email/email-setting.module#EmailSettingModule'
            },
            {
                path: 'sms',
                loadChildren: 'app/settings/communication/sms/sms-setting.module#SmsSettingModule'
            }
        ]
    }
];

export const CommunicationSettingRoutingModule = RouterModule.forChild(ROUTES);
