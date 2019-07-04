import { Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanModel } from '../models/loan-model';
import { LoanService } from '../data/loan.service';

import { NotificationService } from '../../shared/notification.service';

@Component({
    selector: 'app-add-lead',
    styles: [],
    templateUrl: './add-loan.component.html'
})
export class AddLoanComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    lead: LoanModel;

    loader = false;

    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;

    formGroup: FormGroup;

    leadStatuses: any = [];
    leadSources: any = [];
    leadTypes: any = [];

    @ViewChild('stepper', {static: true }) stepper: MatStepper;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private leadService: LoanService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<AddLoanComponent>) {
    }

    ngOnInit() {

       /* this.leadStatusService.list('name')
            .subscribe((res) => this.leadStatuses = res,
                () => this.leadStatuses = []
            );

        this.leadSourceService.list('name')
            .subscribe((res) => this.leadSources = res,
                () => this.leadSources = []
            );*/

        this.firstFormGroup = this.fb.group({
            title: ['', Validators.required],
            amount: [''],
            organization: [''],
            first_name: [''],
            last_name: [''],
            email: [''],
        });

        this.secondFormGroup = this.fb.group({
            phone: ['', Validators.required],
            mobile: [''],
            address1: [''],
            address2: [''],
            preferred_comm: [''],
            industry: [''],
            country: [''],
            state: [''],
            city: [''],
        });

        this.thirdFormGroup = this.fb.group({
            status_id: ['', Validators.required],
            source_id: [''],
            type_id: [''],
            company_id: [''],
            lead_owner_id: [''],
            zip_code: [''],
            website: [''],
            notes: [''],
        });

        /*this.form = this.fb.group({
            amount: ['', [Validators.required,
                Validators.minLength(3)]],
            first_name: ['', [Validators.required,
                Validators.minLength(3)]],
            last_name: [''],
            company_id: [''],
            title: [''],
            lead_owner_id: [''],
            status_id: [''],
            source_id: [''],
            type_id: [''],
            email: [''],
            phone: [''],
            preferred_comm: [''],
            address1: [''],
            country: [''],
            state: [''],
            city: [''],
            organization: [''],
            industry: [''],
            notes: [''],
        });*/
    }

    /*save() {
        this.dialogRef.close(this.form.value);
    }*/

    close() {
        this.dialogRef.close();
    }

   /* createxx() {

        const data = {...this.firstFormGroup.value, ...this.secondFormGroup.value, ...this.thirdFormGroup.value};
        console.log('All data');
        console.log(data);


        const xx = Object.assign({}, this.firstFormGroup.value);
        console.log(xx);


        /!*const body = Object.assign({}, this.lead, this.formGroup.value);

        console.log(body);*!/

    }*/

    /**
     * Create lead
     */
    create() {

        const data = {...this.firstFormGroup.value, ...this.secondFormGroup.value, ...this.thirdFormGroup.value};

        const body = Object.assign({}, this.lead, data);
        this.loader = true;

        this.leadService.create(body)
            .subscribe((res) => {
                    console.log('Create Source: ', res);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New lead created.');
                },
                (error) => {
                    this.loader = false;
                    if (error.lead === 0) {
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

                            this.stepper.selectedIndex = 0;

                            if (this.thirdFormGroup.controls[prop]) {
                                this.thirdFormGroup.controls[prop].setErrors({incorrect: true});
                            }
                            if (this.secondFormGroup.controls[prop]) {
                            this.secondFormGroup.controls[prop].setErrors({incorrect: true});
                            }
                            if (this.firstFormGroup.controls[prop]) {
                                this.firstFormGroup.controls[prop].setErrors({incorrect: true});
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
       // this.form.reset();
        this.dialogRef.close();
    }

}

