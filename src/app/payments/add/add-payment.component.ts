import { Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentModel } from '../models/payment-model';
import { PaymentService } from '../data/payment.service';

import { NotificationService } from '../../shared/notification.service';
import { PaymentMethodSettingService } from '../../settings/payment/method/data/payment-method-setting.service';

@Component({
    selector: 'app-add-payment',
    styles: [],
    templateUrl: './add-payment.component.html'
})
export class AddPaymentComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    payment: PaymentModel;

    loader = false;

    paymentMethods: any = [];
    invoices: any = [];
    clients: any = [];

    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;

    formGroup: FormGroup;

    paymentStatuses: any = [];
    paymentSources: any = [];
    paymentTypes: any = [];

    @ViewChild('stepper', {static: true }) stepper: MatStepper;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private paymentService: PaymentService,
                private notification: NotificationService,

                private paymentMethodService: PaymentMethodSettingService,


                private dialogRef: MatDialogRef<AddPaymentComponent>) {
    }

    ngOnInit() {

        this.paymentMethodService.list('name')
            .subscribe((res) => this.paymentMethods = res,
                () => this.paymentMethods = []
            );

        /*this.clientService.list('business_name')
            .subscribe((res) => this.clients = res,
                () => this.clients = []
            );*/

        this.form = this.fb.group({
            method_id: [''/*, [Validators.required,
                Validators.minLength(3)]*/],
            amount: [''],
            loan_id: [''],
            date: [''],
            paid_to: [''],
            notes: [''],
            attachment: [''],
            // receipt_number: [''],
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    /**
     * Create payment
     */
    create() {

        const body = Object.assign({}, this.payment, this.form.value);

        this.loader = true;

        this.paymentService.create(body)
            .subscribe((data) => {
                    console.log('Create Source: ', data);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New payment created.');
                },
                (error) => {
                    this.loader = false;
                    if (error.payment === 0) {
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

