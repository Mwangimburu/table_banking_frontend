import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleSettingService } from '../../data/role-setting.service';
import { RoleSettingModel } from '../../model/role-setting-model';
import { PermissionSettingService } from '../../data/permission-setting.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
    selector: 'app-assign-role',
    styles: [],
    templateUrl: './assign-role.component.html'
})
export class AssignRoleComponent implements OnInit  {

    form: FormGroup;
    formCheck: FormGroup;

    formErrors: any;

    role: RoleSettingModel;

    loader = false;

    permissions: any = [];

    rolePermissions: any = [];

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private roleService: RoleSettingService,
                private permissionService: PermissionSettingService,
                private notification: NotificationService,
    private dialogRef: MatDialogRef<AssignRoleComponent>) {

        this.role = row.role;
    }

    ngOnInit() {

        this.permissionService.list('name')
            .subscribe((res) => {
                    this.permissions = res;
                  //  console.log(res[0].name);
                  //  console.log(res[0].id);
                },
                () => this.permissions = []
            );

        this.roleService.getById(this.role.id).subscribe(res => {
            this.rolePermissions = res['data'].permissions;
           // console.log('fetch role by id:');
           console.log(res);
                console.log('...xxxxx...');

                console.log(this.rolePermissions);
                console.log('...yyyyy...');
                console.log(this.permissions);

            },
            () => this.rolePermissions = []
        );

       /* console.log(this.permissions);
        console.log('.....');
        console.log(this.rolePermissions);*/


        this.formCheck = this.fb.group({
            permissions: new FormArray([])
        });

        this.addCheckboxes();

        this.form = this.fb.group({
            name: [this.role.name, [Validators.required,
                Validators.minLength(3)]],
            display_name: [this.role.display_name],
        });
    }

    private addCheckboxes() {
        this.permissions.map((o, i) => {
            const control = new FormControl(i === 0); // if first item set to true, else false
            (this.formCheck.controls.permissions as FormArray).push(control);
        });
    }

    submit() {
        console.log(this.form.value);
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
