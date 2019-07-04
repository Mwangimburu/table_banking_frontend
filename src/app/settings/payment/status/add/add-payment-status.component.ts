import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentStatusSettingModel } from '../model/payment-status-setting.model';
import { PaymentStatusSettingService } from '../data/payment-status-setting.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
    selector: 'app-add-tax-status',
    styles: [],
    templateUrl: './add-payment-status.component.html'
})
export class AddPaymentStatusComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    status: PaymentStatusSettingModel;

    loader = false;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private statusService: PaymentStatusSettingService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<AddPaymentStatusComponent>) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', [Validators.required,
                Validators.minLength(3)]],
            description: [''],
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    /**
     * Create a resource
     */
    createStatus() {

        const body = Object.assign({}, this.status, this.form.value);

        this.loader = true;

        this.statusService.create(body)
            .subscribe((data) => {
                    console.log('Create Status: ', data);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New status created.');
                },
                (error) => {
                    this.loader = false;
                    if (error.status === 0) {
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
