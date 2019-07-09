import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from '../model/employee.model';
import { EmployeeService } from '../data/employee.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
    selector: 'app-add-employee',
    styles: [],
    templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    employee: EmployeeModel;

    loader = false;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private branchService: EmployeeService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<AddEmployeeComponent>) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            first_name: ['', [Validators.required,
                Validators.minLength(3)]],
            last_name: [''],
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
    createBranch() {

        const body = Object.assign({}, this.employee, this.form.value);

        this.loader = true;

        this.branchService.create(body)
            .subscribe((data) => {
                    console.log('Create Employee: ', data);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New employee created.');
                },
                (error) => {
                    this.loader = false;
                    if (error.employee === 0) {
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
