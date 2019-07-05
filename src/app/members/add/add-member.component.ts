import { Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberModel } from '../models/member-model';
import { MemberService } from '../data/member.service';

import { NotificationService } from '../../shared/notification.service';
import { PaymentMethodSettingService } from '../../settings/payment/method/data/payment-method-setting.service';

@Component({
    selector: 'app-add-member',
    styles: [],
    templateUrl: './add-member.component.html'
})
export class AddMemberComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    member: MemberModel;

    loader = false;

    memberMethods: any = [];

    formGroup: FormGroup;

    memberStatuses: any = [];
    memberSources: any = [];
    memberTypes: any = [];

    @ViewChild('stepper', {static: true }) stepper: MatStepper;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private memberService: MemberService,
                private notification: NotificationService,

                private memberMethodService: PaymentMethodSettingService,


                private dialogRef: MatDialogRef<AddMemberComponent>) {
    }

    ngOnInit() {

        this.memberMethodService.list('name')
            .subscribe((res) => this.memberMethods = res,
                () => this.memberMethods = []
            );

        this.form = this.fb.group({
            first_name: [''/*, [Validators.required,
                Validators.minLength(3)]*/],
            middle_name: [''],
            last_name: [''],
            nationality: [''],
            id_number: [''],
            passport_number: [''],
            phone: [''],
            email: [''],
            postal_address: [''],
            residential_address: [''],
            bank_name: [''],
            bank_account: [''],
            bank_branch: [''],
            status_id: [''],
            passport_photo: [''],
            national_id_image: [''],
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

        this.loader = true;

        this.memberService.create(body)
            .subscribe((data) => {
                    console.log('Create Source: ', data);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New member created.');
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

