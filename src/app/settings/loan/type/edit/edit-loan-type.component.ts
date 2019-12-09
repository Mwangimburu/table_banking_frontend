import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoanTypeSettingModel } from '../model/loan-type-setting.model';
import { LoanTypeSettingService } from '../data/loan-type-setting.service';
import { NotificationService } from '../../../../shared/notification.service';
import { PenaltyTypeSettingService } from '../../penalty/data/penalty-type-setting.service';
import { PenaltyFrequencySettingService } from '../../penalty/data/penalty-frequency-setting.service';

@Component({
    selector: 'app-edit-tax-type',
    styles: [],
    templateUrl: './edit-loan-type.component.html'
})
export class EditLoanTypeComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    type: LoanTypeSettingModel;

    loader = false;

    interestTypes: any = [];
    paymentFrequencies: any = [];

    penaltyTypes: any = [];
    penaltyFrequencies: any = [];

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private typeService: LoanTypeSettingService,
                private notification: NotificationService,
    private dialogRef: MatDialogRef<EditLoanTypeComponent>) {

        this.type = row.type;
        this.interestTypes = row.interestTypes;
        this.paymentFrequencies = row.paymentFrequencies;
        this.penaltyTypes = row.penaltyTypes;
        this.penaltyFrequencies = row.penaltyFrequencies;

        this.form = fb.group({
            name: [this.type.name, [Validators.required,
                Validators.minLength(3)]],
            description: [this.type.description],
            repayment_period: [this.type.repayment_period],
            interest_rate: [this.type.interest_rate],
            interest_type_id: [this.type.interest_type_id],
            service_fee: [this.type.service_fee],
            payment_frequency_id: [this.type.payment_frequency_id],
            active_status: [this.type.active_status],
            penalty_type_id: [this.type.penalty_type_id],
            penalty_value: [this.type.penalty_value],
            penalty_frequency_id: [this.type.penalty_frequency_id],
            reduce_principal_early: [this.type.reduce_principal_early]
        });
    }

    ngOnInit() {
        //
    }

    close() {
        this.dialogRef.close();
    }

    updateType() {
        const body = Object.assign({}, this.type, this.form.value);

        this.loader = true;
        this.typeService.update(body)
            .subscribe((data) => {
                    console.log('Update type: ', data);
                    this.loader = false;

                    // this.loadData();
                    this.dialogRef.close(this.form.value);

                    // notify success
                    this.notification.showNotification('success', 'Success !! Type has been updated.');

                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit type component: ', error);

                    if (error.type === 0) {
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
