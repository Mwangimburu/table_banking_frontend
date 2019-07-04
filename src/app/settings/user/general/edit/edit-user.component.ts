import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSettingModel } from '../../model/user-setting.model';
import { UserSettingService } from '../../data/user-setting.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
    selector: 'app-edit-user',
    styles: [],
    templateUrl: './edit-user.component.html'
})

export class EditUserComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    user: UserSettingModel;

    loader = false;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private userService: UserSettingService,
                private notification: NotificationService,
    private dialogRef: MatDialogRef<EditUserComponent>) {

        this.user = row.user;
    }

    ngOnInit() {
        this.form = this.fb.group({
            first_name: [this.user.first_name, [Validators.required,
                Validators.minLength(3)]],
            last_name: [this.user.last_name],
        });
    }

    close() {
        this.dialogRef.close();
    }

    updateUser() {
        const body = Object.assign({}, this.user, this.form.value);

        this.loader = true;
        this.userService.update(body)
            .subscribe((data) => {
                    console.log('Update user: ', data);
                    this.loader = false;

                    // this.loadData();
                    this.dialogRef.close(this.form.value);

                    // notify success
                    this.notification.showNotification('success', 'Success !! User has been updated.');

                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit user component: ', error);

                    if (error.user === 0) {
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
