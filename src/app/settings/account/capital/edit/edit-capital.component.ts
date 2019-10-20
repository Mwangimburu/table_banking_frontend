import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapitalSettingModel } from '../model/capital-setting.model';
import { CapitalSettingService } from '../data/capital-setting.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
    selector: 'app-edit-tax-type',
    styles: [],
    templateUrl: './edit-capital.component.html'
})
export class EditCapitalComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    type: CapitalSettingModel;

    loader = false;

    interestTypes: any = [];

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private typeService: CapitalSettingService,
                private notification: NotificationService,
    private dialogRef: MatDialogRef<EditCapitalComponent>) {

        this.type = row.type;
        this.interestTypes = row.interestTypes;


        this.form = fb.group({
            name: [this.type.name, [Validators.required,
                Validators.minLength(3)]],
            description: [this.type.description],
            max_period_in_months: [this.type.max_period_in_months],
            interest_rate: [this.type.interest_rate],
            interest_type_id: [this.type.interest_type_id],
            service_fee: [this.type.service_fee],
            other_charges: [this.type.other_charges],
            active_status: [this.type.active_status]
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
