import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Branch } from '../model/branch';
import { BranchService } from '../data/branch.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
    selector: 'app-add-branch',
    styles: [],
    templateUrl: './add-branch.component.html'
})
export class AddBranchComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    branch: Branch;

    loader = false;

    companies: any = [];
    currencies: any = [];
    categories: any = [];
    statuses: any = [];


    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private branchService: BranchService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<AddBranchComponent>) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            branch_name: [''],
            branch_location: ['']
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    /**
     * Create a rebranch
     */
    create() {

        const body = Object.assign({}, this.branch, this.form.value);

        this.loader = true;

        this.branchService.create(body)
            .subscribe((data) => {
                    console.log('Create Source: ', data);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New branch created.');
                },
                (error) => {
                    this.loader = false;
                    if (error.branch === 0) {
                        this.notification.showNotification('danger', 'Connection Error !! Nothing created.' +
                            ' Check your connection and retry.');
                        return;
                    }
                    // An array of all form errors as returned by server
                    // this.formErrors = error;
                    this.formErrors = error.error.errors;

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
