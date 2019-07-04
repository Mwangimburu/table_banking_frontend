import { Routes, RouterModule } from '@angular/router';
import { PaymentSettingComponent } from './payment-setting.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PaymentSettingComponent,
        children: [
            {
                path: '',
                loadChildren: 'app/settings/payment/general/payment-general-setting.module#PaymentGeneralSettingModule'
            },
            /*{
                path: 'general',
                loadChildren: 'app/settings/payment/general/payment-general-setting.module#PaymentGeneralSettingModule'
            },*/
            {
                path: 'status',
                loadChildren: 'app/settings/payment/status/payment-status-setting.module#PaymentStatusSettingModule'
            },
            {
                path: 'method',
                loadChildren: 'app/settings/payment/method/payment-method-setting.module#PaymentMethodSettingModule'
            }
        ]
    }
];

export const PaymentSettingRoutingModule = RouterModule.forChild(ROUTES);
