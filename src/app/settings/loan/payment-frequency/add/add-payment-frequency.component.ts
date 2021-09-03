import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentFrequencySettingModel } from '../model/payment-frequency-setting.model';
import { PaymentFrequencySettingService } from '../data/payment-frequency-setting.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
    selector: 'app-add-payment-frequency',
    styles: [],
    templateUrl: './add-payment-frequency.component.html'
})
export class AddPaymentFrequencyComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    source: PaymentFrequencySettingModel;

    loader = false;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private sourceService: PaymentFrequencySettingService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<AddPaymentFrequencyComponent>) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', [Validators.required,
                Validators.minLength(3)]],
            display_name: [''],
            description: ['']
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
    createSource() {

        const body = Object.assign({}, this.source, this.form.value);

        this.loader = true;

        this.sourceService.create(body)
            .subscribe((data) => {
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New Payment Frequency created.');
                },
                (error) => {
                    this.loader = false;
                    if (error.source === 0) {
                        this.notification.showNotification('danger', 'Connection Error !! Nothing created.' +
                            ' Check your connection and retry.');
                        return;
                    }
                    // An array of all form errors as returned by server
                    this.formErrors = error;

                    if (this.formErrors) {
                        // loop through from fields, If has an error, mark as invalid so mat-error can show
                        for (const prop in this.formErrors) {
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
