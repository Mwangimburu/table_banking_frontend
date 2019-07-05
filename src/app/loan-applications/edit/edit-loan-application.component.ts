import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanApplicationModel } from '../models/loan-application-model';
import { LoanApplicationService } from '../data/loan-application.service';
import { NotificationService } from '../../shared/notification.service';
import { PaymentMethodSettingService } from '../../settings/payment/method/data/payment-method-setting.service';

@Component({
    selector: 'app-edit-loan-application',
    styles: [],
    templateUrl: './edit-loan-application.component.html'
})
export class EditLoanApplicationComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    loanApplication: LoanApplicationModel;

    loader = false;

    memberStatuses: any = [];

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private memberService: LoanApplicationService,
                private memberStatusService: PaymentMethodSettingService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<EditLoanApplicationComponent>) {

        this.loanApplication = row.data;
    }

    ngOnInit() {

        this.memberStatusService.list('name')
            .subscribe((res) => this.memberStatuses = res,
                () => this.memberStatuses = []
            );

        this.form = this.fb.group({
            member_id: [this.loanApplication.member_id, [Validators.required,
                Validators.minLength(3)]],
            reviewed_by_user_id: [this.loanApplication.reviewed_by_user_id],
            approved_by_user_id: [this.loanApplication.approved_by_user_id],
            application_date: [this.loanApplication.application_date],
            amount_applied: [this.loanApplication.amount_applied],
            repayment_period: [this.loanApplication.repayment_period],
            date_approved: [this.loanApplication.date_approved],
            application_notes: [this.loanApplication.application_notes],
            status_id: [this.loanApplication.status_id],
        });
    }

    close() {
        this.dialogRef.close();
    }

    update() {
        const body = Object.assign({}, this.loanApplication, this.form.value);

        this.loader = true;
        this.memberService.update(body)
            .subscribe((data) => {
                    console.log('Update member: ', data);
                    this.loader = false;

                    // this.loadData();
                    this.dialogRef.close(this.form.value);

                    // notify success
                    this.notification.showNotification('success', 'Success !! Loan application has been updated.');

                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit member component: ', error);

                    if (error.member === 0) {
                        // notify error
                        return;
                    }
                    // An array of all form errors as returned by server
                    this.formErrors = error;

                    if (this.formErrors) {
                        // loop through from fields, If has an error, mark as invalid so mat-error can show
                        for (const prop in this.formErrors) {
                            console.log('Hallo: ', prop);
                            if (this.form) {
                                this.form.controls[prop].setErrors({incorrect: true});
                            }
                        }
                    }
                });
    }

}
