import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentModel } from '../models/payment-model';
import { PaymentService } from '../data/payment.service';
import { NotificationService } from '../../shared/notification.service';
import { PaymentMethodSettingService } from '../../settings/payment/method/data/payment-method-setting.service';

@Component({
    selector: 'app-edit-lead',
    styles: [],
    templateUrl: './edit-payment.component.html'
})
export class EditPaymentComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    payment: PaymentModel;

    loader = false;

    paymentMethods: any = [];
    invoices: any = [];
    clients: any = [];

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private paymentService: PaymentService,
                private paymentMethodService: PaymentMethodSettingService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<EditPaymentComponent>) {

        this.payment = row.data;

        /* this.form = fb.group({
             method_id: [this.payment.method_id, [Validators.required,
                 Validators.minLength(3)]],
             amount: [this.payment.amount],
         });*/
       /* this.clientService.list('business_name')
            .subscribe((res) => this.clients = res,
                () => this.clients = []
            );*/

      /*  this.form = this.fb.group({
            method_id: [this.payment.method_id],
            amount: [this.payment.amount],
            client_id: [this.payment.client_id],
            invoice_id: [this.payment.invoice_id],
            payment_date: [this.payment.payment_date],
            note: [this.payment.note],
            attachment: [this.payment.attachment],
            ref_no: [this.payment.ref_no],
            paid_by: [this.payment.paid_by],
        });*/
    }

    ngOnInit() {

        this.paymentMethodService.list('name')
            .subscribe((res) => this.paymentMethods = res,
                () => this.paymentMethods = []
            );

        this.form = this.fb.group({
            method_id: [this.payment.method_id, [Validators.required,
                Validators.minLength(3)]],
            amount: [this.payment.amount],
            loan_id: [this.payment.loan_id],
            date: [this.payment.date],
            paid_to: [this.payment.paid_to],
            note: [this.payment.notes],
            attachment: [this.payment.attachment],
            receipt_number: [this.payment.receipt_number],
        });
    }

    close() {
        this.dialogRef.close();
    }

    update() {
        const body = Object.assign({}, this.payment, this.form.value);

        this.loader = true;
        this.paymentService.update(body)
            .subscribe((data) => {
                    console.log('Update payment: ', data);
                    this.loader = false;

                    // this.loadData();
                    this.dialogRef.close(this.form.value);

                    // notify success
                    this.notification.showNotification('success', 'Success !! Payment has been updated.');

                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit payment component: ', error);

                    if (error.payment === 0) {
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
