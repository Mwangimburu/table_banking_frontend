import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentMethodSettingModel } from '../model/payment-method-setting.model';
import { PaymentMethodSettingService } from '../data/payment-method-setting.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
    selector: 'app-edit-tax-method',
    styles: [],
    templateUrl: './edit-payment-method.component.html'
})
export class EditPaymentMethodComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    method: PaymentMethodSettingModel;

    loader = false;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private methodService: PaymentMethodSettingService,
                private notification: NotificationService,
    private dialogRef: MatDialogRef<EditPaymentMethodComponent>) {

        this.method = row.method;

        this.form = fb.group({
            name: [{value: this.method.name, disabled: true}, [Validators.required,
                Validators.minLength(3)]],
            display_name: [this.method.display_name, [Validators.required,
                Validators.minLength(3)]],
            description: [this.method.description],
        });
    }

    ngOnInit() {
        //
    }

    close() {
        this.dialogRef.close();
    }

    updateMethod() {
        const body = Object.assign({}, this.method, this.form.value);

        this.loader = true;
        this.methodService.update(body)
            .subscribe((data) => {
                    console.log('Update method: ', data);
                    this.loader = false;

                    // this.loadData();
                    this.dialogRef.close(this.form.value);

                    // notify success
                    this.notification.showNotification('success', 'Success !! Method has been updated.');

                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit method component: ', error);

                    if (error.method === 0) {
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
