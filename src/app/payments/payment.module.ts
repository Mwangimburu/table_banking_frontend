import { NgModule } from '@angular/core';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { MaterialModule } from '../shared/material.module';
import { EditLoanComponent } from './edit/edit-loan.component';
import { AddPaymentComponent } from './add/add-payment.component';

@NgModule({
    imports: [
        MaterialModule,
        PaymentRoutingModule,
    ],
    declarations: [
        PaymentComponent,
        EditLoanComponent,
        AddPaymentComponent
    ],
    entryComponents: [
        EditLoanComponent,
        AddPaymentComponent
    ]
})

export class PaymentModule {}
