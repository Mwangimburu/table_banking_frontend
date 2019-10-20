import { Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentModel } from '../models/payment-model';
import { PaymentService } from '../data/payment.service';

import { NotificationService } from '../../shared/notification.service';
import { PaymentMethodSettingService } from '../../settings/payment/method/data/payment-method-setting.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
    isBank = false;

    paymentMethods: any = [];
    members: any = [];

    accountNumber = '';
    idNumber = '';

    @ViewChild('stepper', {static: true }) stepper: MatStepper;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private paymentService: PaymentService,
                private notification: NotificationService,
                private paymentMethodService: PaymentMethodSettingService,
                private dialogRef: MatDialogRef<AddPaymentComponent>) {
        this.members = row.members;

        this.paymentMethodService.list(['name', 'display_name'])
            .subscribe((res) => this.paymentMethods = res,
                () => this.paymentMethods = []
            );
    }

    ngOnInit() {
        this.form = this.fb.group({
            method_id: ['', [Validators.required,
                Validators.minLength(3)]],
            member_id: ['', [Validators.required,
                Validators.minLength(3)]],
            amount: ['', [Validators.required,
                Validators.minLength(1)]],
            payment_date: [moment(), Validators.required],
            notes: [''],
            attachment: [''],
            account_number: [{value: '', disabled: true}],
            id_number: [{value: '', disabled: true}],

            bank_fields: this.fb.group({
                cheque_number: [''],
                cheque_date: [moment(), Validators.required],
                bank_name: [''],
                bank_branch: ['']
            })
        });
    }

    /**
     * Update supporting fields when member drop down changes content
     * @param value
     */
    onMemberItemChange(value) {
        this.accountNumber = this.members.find((item: any) => item.id === value).account.account_number;
        this.idNumber = this.members.find((item: any) => item.id === value).id_number;
        this.form.patchValue({
            account_number: this.accountNumber,
            id_number: this.idNumber
        });
    }

    onPaymentMethodItemChange(value) {
        const paymentMethod = this.paymentMethods.find((item: any) => item.id === value).name;
        console.log(paymentMethod);
        this.isBank = paymentMethod === 'BANK';
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

      //  console.log('body');
      //  console.log(body);
        this.paymentService.create(body)
            .subscribe((data) => {
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New payment created.');
                },
                (error) => {
                   // console.log(error);
                    this.loader = false;
                    // User has no loan
                    if (error.error && error.error.status_code === 404) {
                        this.notification.showNotification('danger', error.error.message);
                        return;
                    }
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
                           // console.log('Hallo: ' , prop);
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

