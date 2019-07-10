import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSettingModel } from '../../model/user-setting.model';
import { UserSettingService } from '../../data/user-setting.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
    selector: 'app-add-user',
    styles: [],
    templateUrl: './add-user.component.html'
})

export class AddUserComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    user: UserSettingModel;

    loader = false;

    roles: any = [];
    employees: any = [];

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private userService: UserSettingService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<AddUserComponent>) {
        this.roles = row.roles;
        this.employees = row.employees;
    }

    ngOnInit() {

        this.form = this.fb.group({
            first_name: ['', [Validators.required,
                Validators.minLength(3)]],
            last_name: [''],
            role_id: [''],
            employee_id: [''],
            email: [''],
            password: [''],
            password_confirmation: [''],
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
    createUser() {

        const body = Object.assign({}, this.user, this.form.value);

        this.loader = true;

        this.userService.create(body)
            .subscribe((data) => {
                    console.log('Create User: ', data);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New user created.');
                },
                (error) => {
                    this.loader = false;
                    if (error.user === 0) {
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
