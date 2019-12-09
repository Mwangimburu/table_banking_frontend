import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberModel } from '../models/member-model';
import { MemberService } from '../data/member.service';
import { NotificationService } from '../../shared/notification.service';
import { PaymentMethodSettingService } from '../../settings/payment/method/data/payment-method-setting.service';

@Component({
    selector: 'app-edit-member',
    styles: [],
    templateUrl: './edit-member.component.html'
})
export class EditMemberComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    member: MemberModel;

    loader = false;

    memberStatuses: any = [];
    branches: any = [];

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private memberService: MemberService,
                private memberStatusService: PaymentMethodSettingService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<EditMemberComponent>) {

        this.member = row.member;
        this.branches = row.branches;
    }

    ngOnInit() {

        this.memberStatusService.list('name')
            .subscribe((res) => this.memberStatuses = res,
                () => this.memberStatuses = []
            );

        this.form = this.fb.group({
            first_name: [this.member.first_name, [Validators.required,
                Validators.minLength(3)]],
            middle_name: [this.member.middle_name],
            last_name: [this.member.last_name],
            /*branch_id: [this.member.branch_id],*/
            nationality: [this.member.nationality],
            id_number: [this.member.id_number],
            passport_number: [this.member.passport_number],
            phone: [this.member.phone],
            email: [this.member.email],
            postal_address: [this.member.postal_address],
            residential_address: [this.member.residential_address],
            date_of_birth: [this.member.date_of_birth],
            date_became_member: [this.member.date_became_member],
            county: [this.member.county],
            city: [this.member.city],
            status_id: [this.member.status_id],
            passport_photo: [this.member.passport_photo],
            national_id_image: [this.member.national_id_image],
        });
    }

    close() {
        this.dialogRef.close();
    }

    update() {
        const body = Object.assign({}, this.member, this.form.value);

        this.loader = true;
        this.memberService.update(body)
            .subscribe((data) => {
                    console.log('Update member: ', data);
                    this.loader = false;

                    // this.loadData();
                    this.dialogRef.close(this.form.value);

                    // notify success
                    this.notification.showNotification('success', 'Success !! Member has been updated.');

                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit member component: ', error);

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
