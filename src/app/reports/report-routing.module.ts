import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { LoansReportComponent } from './loans/loans-report.component';
import { PaymentsReportComponent } from './payments/payments-report.component';
import { CollateralReportComponent } from './collateral/collateral-report.component';
import { LoanApplicationsReportComponent } from './loan-applications/loan-applications-report.component';
import { MembersReportComponent } from './members/members-report.component';

export const ROUTES: Routes = [
    {
        path: '', component: ReportComponent,
        children: [
            { path: '', component: LoansReportComponent},
            { path: 'payments', component: PaymentsReportComponent},
            { path: 'collateral', component: CollateralReportComponent},
            { path: 'loan_applications', component: LoanApplicationsReportComponent},
            { path: 'members', component: MembersReportComponent}
        ]
    }
];


export const ReportRoutingModule = RouterModule.forChild(ROUTES);
