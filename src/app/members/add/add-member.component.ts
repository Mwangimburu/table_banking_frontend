import { Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberModel } from '../models/member-model';
import { MemberService } from '../data/member.service';

import { NotificationService } from '../../shared/notification.service';
import { PaymentMethodSettingService } from '../../settings/payment/method/data/payment-method-setting.service';
import * as moment from 'moment';

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
    branches: any = [];

    profilePicFileToUpload: File = null;
    nationalIdFileToUpload: File = null;
    membershipFormFileToUpload: File = null;
    profilePicUrl = '';
    nationalIdUrl = '';
    membershipFormUrl = '';

    @ViewChild('stepper', {static: true }) stepper: MatStepper;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private memberService: MemberService,
                private notification: NotificationService,
                private memberMethodService: PaymentMethodSettingService,
                private dialogRef: MatDialogRef<AddMemberComponent>) {
        this.branches = row.branches;
    }

    ngOnInit() {

        this.memberMethodService.list('name')
            .subscribe((res) => this.memberMethods = res,
                () => this.memberMethods = []
            );

        this.form = this.fb.group({
            first_name: ['', [Validators.required,
                Validators.minLength(2)]],
            middle_name: ['', [Validators.required,
                Validators.minLength(2)]],
            last_name: [''],
            nationality: ['', [Validators.required,
                Validators.minLength(2)]],
            id_number: ['', [Validators.required,
                Validators.minLength(2)]],
            passport_number: [''],
            phone: ['', [Validators.required,
                Validators.minLength(2)]],
            email: [''],
            postal_address: ['', [Validators.required,
                Validators.minLength(2)]],
            residential_address: ['', [Validators.required,
                Validators.minLength(2)]],
            county: [''],
            city: [''],
            status_id: [''],
            branch_id: ['', [Validators.required,
                Validators.minLength(2)]],
            date_of_birth: ['', [Validators.required,
                Validators.minLength(2)]],
            date_became_member: [moment(), Validators.required],
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

    handleFileInput(file: FileList) {
        this.profilePicFileToUpload = file.item(0);

        const reader = new FileReader();

        reader.onload = (event: any) => {
            this.profilePicUrl = event.target.result;
        };

        reader.readAsDataURL(this.profilePicFileToUpload);
    }

    onProfilePicSelect(file: FileList) {

        if (file.length > 0) {
            this.profilePicFileToUpload = file.item(0);

            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.profilePicUrl = event.target.result;
            };

            reader.readAsDataURL(this.profilePicFileToUpload);

        //    this.form.get('passport_photo').setValue(this.profilePicFileToUpload);

        }
    }

    onNationalIdFileInputSelect(file: FileList) {

        if (file.length > 0) {
            this.nationalIdFileToUpload = file.item(0);

            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.nationalIdUrl = event.target.result;
            };

            reader.readAsDataURL(this.nationalIdFileToUpload);
        }
    }

    onMembershipFormInputSelect(file: FileList) {

        if (file.length > 0) {
            this.membershipFormFileToUpload = file.item(0);

            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.membershipFormUrl = event.target.result;
            };

            reader.readAsDataURL(this.membershipFormFileToUpload);
        }
    }

    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.get('passport_photo').setValue(file);
        }
    }

    /**
     * Create member
     */
    create() {

        const body = Object.assign({}, this.member, this.form.value);

        const formData = new FormData();
        formData.append('passport_photo', this.profilePicFileToUpload);
       // formData.append('first_name', this.form.get('first_name').value);

        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                formData.append(key, body[key]);
            }
        }

        console.log('***formData 1***');
        console.log(formData);
        console.log('***end formData 1***');


        /*const newBody = Object.assign({}, formData, body);

        console.log('***newBody***');
        console.log(newBody);
        console.log('***formData 2***');
        console.log(formData);*/



        this.loader = true;

        this.memberService.create(formData)
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

