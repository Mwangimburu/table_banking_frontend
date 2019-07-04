import { NgModule } from '@angular/core';

import { LoanRoutingModule } from './loan-routing.module';
import { LoanComponent } from './loan.component';
import { MaterialModule } from '../shared/material.module';
import { EditLoanComponent } from './edit/edit-loan.component';
import { AddLoanComponent } from './add/add-loan.component';

@NgModule({
    imports: [
        MaterialModule,
        LoanRoutingModule,
    ],
    declarations: [
        LoanComponent,
        EditLoanComponent,
        AddLoanComponent
    ],
    entryComponents: [
        EditLoanComponent,
        AddLoanComponent
    ]
})

export class LoanModule {}
