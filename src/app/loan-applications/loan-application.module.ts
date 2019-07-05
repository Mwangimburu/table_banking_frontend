import { NgModule } from '@angular/core';

import { LoanApplicationRoutingModule } from './loan-application-routing.module';
import { LoanApplicationComponent } from './loan-application.component';
import { MaterialModule } from '../shared/material.module';
import { EditLoanApplicationComponent } from './edit/edit-loan-application.component';
import { AddLoanApplicationComponent } from './add/add-loan-application.component';

@NgModule({
    imports: [
        MaterialModule,
        LoanApplicationRoutingModule,
    ],
    declarations: [
        LoanApplicationComponent,
        EditLoanApplicationComponent,
        AddLoanApplicationComponent
    ],
    entryComponents: [
        EditLoanApplicationComponent,
        AddLoanApplicationComponent
    ]
})

export class LoanApplicationModule {}
