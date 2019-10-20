import { NgModule } from '@angular/core';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { MaterialModule } from '../shared/material.module';
import { EditMemberComponent } from './edit/edit-member.component';
import { AddMemberComponent } from './add/add-member.component';
import { MemberDetailComponent } from './detail/member-detail.component';
import { ViewMemberComponent } from './view/view-member.component';
import { ViewMemberGeneralComponent } from './view/general/view-member-general.component';
import { MemberPaymentComponent } from './view/payment/member-payment.component';
import { MemberxxPaymentComponent } from './detail/memberxx-payment-component';
import { MemberCollateralComponent } from './view/collaterals/member-collateral.component';
import { MemberLoansComponent } from './view/loans/member-loans.component';
import { MemberLoanApplicationsComponent } from './view/loan-applications/member-loan-applications.component';
import { MemberGuaranteeComponent } from './view/guarantee/member-guarantee.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ConfirmationDialogComponent } from '../shared/delete/confirmation-dialog-component';

@NgModule({
    imports: [
        MaterialModule,
        MemberRoutingModule,
        MatMomentDateModule
    ],
    declarations: [
        MemberComponent,
        EditMemberComponent,
        AddMemberComponent,
        MemberDetailComponent,
        ViewMemberComponent,
        ViewMemberGeneralComponent,
        MemberPaymentComponent,
        MemberxxPaymentComponent,
        MemberCollateralComponent,
        MemberLoansComponent,
        MemberLoanApplicationsComponent,
        MemberGuaranteeComponent
    ],
    entryComponents: [
        EditMemberComponent,
        AddMemberComponent,
        ConfirmationDialogComponent
    ]
})

export class MemberModule {}
