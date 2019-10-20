import { NgModule } from '@angular/core';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { MaterialModule } from '../shared/material.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { LoansReportComponent } from './loans/loans-report.component';
import { PaymentsReportComponent } from './payments/payments-report.component';
import { CollateralReportComponent } from './collateral/collateral-report.component';
import { LoanApplicationsReportComponent } from './loan-applications/loan-applications-report.component';
import { MembersReportComponent } from './members/members-report.component';

@NgModule({
    imports: [
        MaterialModule,
        ReportRoutingModule,
        MatMomentDateModule
    ],
    declarations: [
        ReportComponent,
        LoansReportComponent,
        PaymentsReportComponent,
        CollateralReportComponent,
        LoanApplicationsReportComponent,
        MembersReportComponent
    ],
    entryComponents: [
    ]
})

export class ReportModule {}
