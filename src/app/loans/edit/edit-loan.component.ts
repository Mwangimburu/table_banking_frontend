import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanModel } from '../models/loan-model';
import { LoanService } from '../data/loan.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
    selector: 'app-edit-lead',
    styles: [],
    templateUrl: './edit-loan.component.html'
})
export class EditLoanComponent implements OnInit  {

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
                private dialogRef: MatDialogRef<EditLoanComponent>) {

        this.lead = row.lead;

        this.form = fb.group({
            first_name: [this.lead.first_name, [Validators.required,
                Validators.minLength(3)]],
            last_name: [this.lead.last_name],
        });
    }

    ngOnInit() {
        /*this.leadStatusService.list('name')
            .subscribe((res) => this.leadStatuses = res,
                () => this.leadStatuses = []
            );

        this.leadSourceService.list('name')
            .subscribe((res) => this.leadSources = res,
                () => this.leadSources = []
            );

        this.leadTypeService.list('name')
            .subscribe((res) => this.leadTypes = res,
                () => this.leadTypes = []
            );*/

        this.firstFormGroup = this.fb.group({
            title: [this.lead.title, Validators.required],
            amount: [this.lead.amount],
            organization: [this.lead.organization],
            first_name: [this.lead.first_name],
            last_name: [this.lead.last_name],
            email: [this.lead.email],
        });

        this.secondFormGroup = this.fb.group({
            phone: [this.lead.phone, Validators.required],
            mobile: [this.lead.mobile],
            address1: [this.lead.address1],
            address2: [this.lead.address2],
            preferred_comm: [this.lead.preferred_comm],
            industry: [this.lead.industry],
            country: [this.lead.country],
            state: [this.lead.state],
            city: [this.lead.city],
        });

        this.thirdFormGroup = this.fb.group({
            status_id: [this.lead.status_id, Validators.required],
            source_id: [this.lead.source_id],
            type_id: [this.lead.type_id],
            company_id: [this.lead.company_id],
            lead_owner_id: [this.lead.lead_owner_id],
            zip_code: [this.lead.zip_code],
            website: [this.lead.website],
            notes: [this.lead.notes],
        });
    }

    close() {
        this.dialogRef.close();
    }

    update() {
        const body = Object.assign({}, this.lead, this.form.value);

        this.loader = true;
        this.leadService.update(body)
            .subscribe((data) => {
                    console.log('Update lead: ', data);
                    this.loader = false;

                    // this.loadData();
                    this.dialogRef.close(this.form.value);

                    // notify success
                    this.notification.showNotification('success', 'Success !! Lead has been updated.');

                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit lead component: ', error);

                    if (error.lead === 0) {
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
