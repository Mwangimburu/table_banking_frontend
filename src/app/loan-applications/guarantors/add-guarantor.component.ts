import { Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';


import { NotificationService } from '../../shared/notification.service';
import { PaymentMethodSettingService } from '../../settings/payment/method/data/payment-method-setting.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GuarantorModel } from './guarantor-model';
import { GuarantorService } from './data/guarantor.service';

@Component({
    selector: 'app-add-guarantor',
    styles: [],
    templateUrl: './add-guarantor.component.html'
})
export class AddGuarantorComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    member: GuarantorModel;

    loader = false;

    memberMethods: any = [];

    formGroup: FormGroup;

    members: any = [];
    loans: any = [];
    loanApplicationId: any;

    @ViewChild('stepper', {static: true }) stepper: MatStepper;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private guarantorService: GuarantorService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<AddGuarantorComponent>) {
        this.members = row.members;
        this.loans = row.loans;
        this.loanApplicationId = row.loanApplicationId;
    }

    ngOnInit() {

        this.form = this.fb.group({
            member_id: [''/*, [Validators.required,
                Validators.minLength(3)]*/],
            national_id: [''],
            loan_application_id: [''],
            assign_date: [''],
            guarantee_amount: [''],
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    /**
     * Create member
     */
    create() {

        const body = Object.assign({}, this.member, this.form.value);

        body.loan_application_id = this.loanApplicationId;

        console.log('body');
        console.log(body);

        this.loader = true;

        this.guarantorService.create(body)
            .subscribe((data) => {
                    console.log('Create Source: ', data);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New guarantor created.');
                },
                (error) => {
                    this.loader = false;
                    if (error.member === 0) {
                        this.notification.showNotification('danger', 'Connection Error !! Nothing created.' +
                            ' Check your connection and retry.');
                        return;
                    }
                    // An array of all form errors as returned by server
                    this.formErrors = error;

                    if (this.formErrors) {
                        // loop through from fields, If has an error, mark as invalid so mat-error can show
                        for (const prop in this.formErrors) {
                            console.log('Hallo: ' , prop);
                            if (this.form) {
                                this.form.controls[prop].setErrors({incorrect: true});
                            }
                        }
                    }

                });
    }

    /**
     *
     */
    public onSaveComplete(): void {
        this.loader = false;
        this.form.reset();
        this.dialogRef.close(this.form.value);
    }

}

