import { NgModule } from '@angular/core';

import { PaymentFrequencySettingRoutingModule } from './payment-frequency-setting-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import { InterestTypeSettingComponent } from './interest-type-setting.component';
import { AddPaymentFrequencyComponent } from './add/add-payment-frequency.component';
import { EditPaymentFrequencyComponent } from './edit/edit-payment-frequency.component';

@NgModule({
    imports: [
        MaterialModule,
        PaymentFrequencySettingRoutingModule,
    ],
    declarations: [
        InterestTypeSettingComponent,
        AddPaymentFrequencyComponent,
        EditPaymentFrequencyComponent
    ],
    entryComponents: [
        AddPaymentFrequencyComponent,
        EditPaymentFrequencyComponent
    ]
})

export class PaymentFrequencySettingModule {}
