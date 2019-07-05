import { NgModule } from '@angular/core';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { MaterialModule } from '../shared/material.module';
import { EditPaymentComponent } from './edit/edit-payment.component';
import { AddPaymentComponent } from './add/add-payment.component';

@NgModule({
    imports: [
        MaterialModule,
        PaymentRoutingModule,
    ],
    declarations: [
        PaymentComponent,
        EditPaymentComponent,
        AddPaymentComponent
    ],
    entryComponents: [
        EditPaymentComponent,
        AddPaymentComponent
    ]
})

export class PaymentModule {}
