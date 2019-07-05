import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BorrowerModel } from '../models/borrower-model';
import { BorrowerService } from '../data/borrower.service';
import { NotificationService } from '../../shared/notification.service';
import { PaymentMethodSettingService } from '../../settings/payment/method/data/payment-method-setting.service';

@Component({
    selector: 'app-edit-borrower',
    styles: [],
    templateUrl: './edit-borrower.component.html'
})
export class EditBorrowerComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    borrower: BorrowerModel;

    loader = false;

    memberStatuses: any = [];

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private memberService: BorrowerService,
                private memberStatusService: PaymentMethodSettingService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<EditBorrowerComponent>) {

        this.borrower = row.data;
    }

    ngOnInit() {

        this.memberStatusService.list('name')
            .subscribe((res) => this.memberStatuses = res,
                () => this.memberStatuses = []
            );

        this.form = this.fb.group({
            member_id: [this.borrower.member_id, [Validators.required,
                Validators.minLength(3)]],
            spouse_type: [this.borrower.spouse_type],
            spouse_name: [this.borrower.spouse_name],
            spouse_id_number: [this.borrower.spouse_id_number],
            spouse_phone: [this.borrower.spouse_phone],
            spouse_address: [this.borrower.spouse_address]
        });
    }

    close() {
        this.dialogRef.close();
    }

    update() {
        const body = Object.assign({}, this.borrower, this.form.value);

        this.loader = true;
        this.memberService.update(body)
            .subscribe((data) => {
                    console.log('Update member: ', data);
                    this.loader = false;

                    // this.loadData();
                    this.dialogRef.close(this.form.value);

                    // notify success
                    this.notification.showNotification('success', 'Success !! Borrower has been updated.');

                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit borrower component: ', error);

                    if (error.member === 0) {
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
