import { Routes, RouterModule } from '@angular/router';
import { InterestTypeSettingComponent } from './interest-type-setting.component';

export const ROUTES: Routes = [
    { path: '', component: InterestTypeSettingComponent },
];

export const PaymentFrequencySettingRoutingModule = RouterModule.forChild(ROUTES);
