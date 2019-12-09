import { Routes, RouterModule } from '@angular/router';
import { CommunicationSettingComponent } from './communication-setting.component';
import { EmailSettingResolverService } from './email/data/email-setting-resolver.service';
import { SmsSettingResolverService } from './sms/data/sms-setting-resolver.service';
import { EmailTemplateSettingResolverService } from './email-template/data/email-template-setting-resolver.service';
import { SmsTemplateSettingResolverService } from './sms-template/data/sms-template-setting-resolver.service';

export const ROUTES: Routes = [
    {
        path: '',
        component: CommunicationSettingComponent,
        children: [
            {
                path: '',
                loadChildren: 'app/settings/communication/general/communication-general-setting.module#CommunicationGeneralSettingModule'
            },
          /*  {
                path: '',
                loadChildren: 'app/settings/communication/email/email-setting.module#EmailSettingModule',
                resolve : { setting: EmailSettingResolverService}
            },*/
           {
                path: 'email',
                loadChildren: 'app/settings/communication/email/email-setting.module#EmailSettingModule',
                resolve : { setting: EmailSettingResolverService}

           },
            {
                path: 'sms',
                loadChildren: 'app/settings/communication/sms/sms-setting.module#SmsSettingModule',
                resolve : { setting: SmsSettingResolverService}
            },
            {
                path: 'email_templates',
                loadChildren: 'app/settings/communication/email-template/email-template-setting.module#EmailTemplateSettingModule',
              //  resolve : { setting: EmailTemplateSettingResolverService}
            },
            {
                path: 'sms_templates',
                loadChildren: 'app/settings/communication/sms-template/sms-template-setting.module#SmsTemplateSettingModule',
               // resolve : { setting: SmsTemplateSettingResolverService}
            }
        ]
    }
];

export const CommunicationSettingRoutingModule = RouterModule.forChild(ROUTES);
