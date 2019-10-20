import { NgModule } from '@angular/core';

import { LoanRoutingModule } from './loan-routing.module';
import { LoanComponent } from './loan.component';
import { MaterialModule } from '../shared/material.module';
import { EditLoanComponent } from './edit/edit-loan.component';
import { AddLoanComponent } from './add/add-loan.component';
import { ViewLoanComponent } from './view/view-loan.component';
import { LoanAmortizationComponent } from './amortization/loan-amortization.component';
import { ViewLoanGeneralComponent } from './view/general/view-loan-general.component';
import { ViewLoanCollateralComponent } from './view/collateral/view-loan-collateral.component';
import { ViewLoanGuarantorsComponent } from './view/guarantors/view-loan-guarantors.component';
import { ViewLoanLoanApplicationsComponent } from './view/loan-applications/view-loan-loan-applications.component';
import { ViewLoanPaymentsComponent } from './view/payments/view-loan-payments.component';
import { ViewLoanAdjustmentComponent } from './view/adjustment/view-loan-adjustment.component';

@NgModule({
    imports: [
        MaterialModule,
        LoanRoutingModule,
    ],
    declarations: [
        LoanComponent,
        EditLoanComponent,
        AddLoanComponent,
        ViewLoanComponent,
        LoanAmortizationComponent,
        ViewLoanGeneralComponent,
        ViewLoanCollateralComponent,
        ViewLoanGuarantorsComponent,
        ViewLoanLoanApplicationsComponent,
        ViewLoanPaymentsComponent,
        ViewLoanAdjustmentComponent
    ],
    entryComponents: [
        EditLoanComponent,
        AddLoanComponent,
        LoanAmortizationComponent
    ]
})

export class LoanModule {}
