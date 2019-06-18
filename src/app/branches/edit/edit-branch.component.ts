import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Branch } from '../model/branch';
import { BranchService } from '../data/branch.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
    selector: 'app-edit-branch',
    styles: [],
    templateUrl: './edit-branch.component.html'
})
export class EditBranchComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    branch: Branch;

    loader = false;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private branchService: BranchService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<EditBranchComponent>) {

        this.branch = row.branch;

        this.form = this.fb.group({
            branch_name: [this.branch.branch_name],
            branch_location: [this.branch.branch_location]
        });

    }

    ngOnInit() {
        //
    }

    close() {
        this.dialogRef.close();
    }

    update() {
        const body = Object.assign({}, this.branch, this.form.value);

        this.loader = true;
        this.branchService.update(body)
            .subscribe((data) => {
                    console.log('Update branch: ', data);
                    this.loader = false;

                    // this.loadData();
                    this.dialogRef.close(this.form.value);

                    // notify success
                    this.notification.showNotification('success', 'Success !! Branch has been updated.');

                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit branch component: ', error);

                    if (error.branch === 0) {
                        // notify error
                        return;
                    }
                    // An array of all form errors as returned by server
                    // this.formErrors = error;
                    this.formErrors = error.error.errors;

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
