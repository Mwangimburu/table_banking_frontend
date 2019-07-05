import { Routes, RouterModule } from '@angular/router';
import { LoanApplicationComponent } from './loan-application.component';
import { EditLoanApplicationComponent } from './edit/edit-loan-application.component';
import { AddLoanApplicationComponent } from './add/add-loan-application.component';

export const ROUTES: Routes = [
    { path: '', component: LoanApplicationComponent },
    { path: ':id/edit', component: EditLoanApplicationComponent },
    { path: 'create', component: AddLoanApplicationComponent },
];


export const LoanApplicationRoutingModule = RouterModule.forChild(ROUTES);
