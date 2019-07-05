import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { EditPaymentComponent } from './edit/edit-payment.component';
import { AddPaymentComponent } from './add/add-payment.component';

export const ROUTES: Routes = [
    { path: '', component: PaymentComponent },
    { path: ':id/edit', component: EditPaymentComponent },
    { path: 'create', component: AddPaymentComponent },
];


export const PaymentRoutingModule = RouterModule.forChild(ROUTES);
