import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapitalSettingModel } from '../model/capital-setting.model';
import { CapitalSettingService } from '../data/capital-setting.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
    selector: 'app-add-tax-type',
    styles: [],
    templateUrl: './add-capital.component.html'
})
export class AddCapitalComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    type: CapitalSettingModel;

    loader = false;

    interestTypes: any;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private typeService: CapitalSettingService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<AddCapitalComponent>) {
        this.interestTypes = row.interestTypes;

    }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', [Validators.required,
                Validators.minLength(3)]],
            max_period_in_months: [''],
            interest_rate: [''],
            interest_type_id: [''],
            service_fee: [''],
            other_charges: [''],
            description: [''],
            active_status: ['']
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
    createType() {

        const body = Object.assign({}, this.type, this.form.value);

        this.loader = true;

        this.typeService.create(body)
            .subscribe((data) => {
                    console.log('Create Type: ', data);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New type created.');
                },
                (error) => {
                    this.loader = false;
                    if (error.type === 0) {
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
