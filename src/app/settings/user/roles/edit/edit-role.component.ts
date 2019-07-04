import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleSettingService } from '../../data/role-setting.service';
import { RoleSettingModel } from '../../model/role-setting-model';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
    selector: 'app-edit-role',
    styles: [],
    templateUrl: './edit-role.component.html'
})
export class EditRoleComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    role: RoleSettingModel;

    loader = false;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private roleService: RoleSettingService,
                private notification: NotificationService,
    private dialogRef: MatDialogRef<EditRoleComponent>) {

        this.role = row.role;
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: [this.role.name, [Validators.required,
                Validators.minLength(3)]],
            display_name: [this.role.display_name],
        });
    }

    close() {
        this.dialogRef.close();
    }

    update() {
        const body = Object.assign({}, this.role, this.form.value);

        this.loader = true;
        this.roleService.update(body)
            .subscribe((data) => {
                    console.log('Update role: ', data);
                    this.loader = false;

                    // this.loadData();
                    this.dialogRef.close(this.form.value);

                    // notify success
                    this.notification.showNotification('success', 'Success !! Role has been updated.');

                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit role component: ', error);

                    if (error.role === 0) {
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
