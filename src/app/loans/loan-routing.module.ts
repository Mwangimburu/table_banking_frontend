import { Routes, RouterModule } from '@angular/router';
import { LoanComponent } from './loan.component';
import { EditLoanComponent } from './edit/edit-loan.component';
import { AddLoanComponent } from './add/add-loan.component';

export const ROUTES: Routes = [
    { path: '', component: LoanComponent },
    { path: ':id/edit', component: EditLoanComponent },
    { path: 'create', component: AddLoanComponent },
];


export const LoanRoutingModule = RouterModule.forChild(ROUTES);
