import { Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoanApplicationModel } from '../models/loan-application-model';
import { LoanApplicationService } from '../data/loan-application.service';

import { NotificationService } from '../../shared/notification.service';
import { PaymentMethodSettingService } from '../../settings/payment/method/data/payment-method-setting.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

import { Router } from '@angular/router';
import { LoanTypeSettingService } from '../../settings/loan/type/data/loan-type-setting.service';
import { MemberService } from '../../members/data/member.service';
import * as moment from 'moment';
import { WitnessTypeSettingService } from '../../settings/borrower/witness-type/data/witness-type-setting.service';

@Component({
    selector: 'app-add-loan-application',
    styles: [],
    templateUrl: './add-loan-application.component.html'
})
export class AddLoanApplicationComponent implements OnInit  {

    form: FormGroup;

    formErrors: any;

    loanApplication: LoanApplicationModel;

    loader = false;

    formGroup: FormGroup;

    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;

    leadStatuses: any = [];

    loanTypes: any = [];
    members: any = [];
    users: any = [];
    accounts: any = [];
    memberAccounts: any = [];

    userPhone = '';
    lastName = '';

    nationalID = '';

    accountNumber = '';
    interestRate = '';
    interestType = '';
    interestTypeId = '';
    serviceFee: any;

    penaltyTypeId: any;
    penaltyValue: any;
    penaltyFrequencyId: any;

    reducePrincipalEarly: boolean;

    repaymentPeriod = '';
    repaymentFrequency = '';
    repaymentFrequencyId: any;

    paymentMethods: any;
    witnessTypes: any;

    fileToUpload: File = null;
    fileUrl = '';

    applicationFormToUpload: File = null;
    applicationFormUrl = '';

    options: string[] = ['One', 'Two', 'Three', 'Five'];
    filteredOptions: Observable<string[]>;

    @ViewChild('stepper', {static: true }) stepper: MatStepper;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
        private fb: FormBuilder, private router: Router, private memberService: MemberService,
                private witnessTypeService: WitnessTypeSettingService,
                private loanTypeService: LoanTypeSettingService, private paymentMethodService: PaymentMethodSettingService,
                private notification: NotificationService, private loanApplicationService: LoanApplicationService,
                private memberMethodService: PaymentMethodSettingService, private dialogRef: MatDialogRef<AddLoanApplicationComponent>) {
        this.members = row.members;
        this.users = row.users;
        this.loanTypes = row.loanTypes;
    }

    ngOnInit() {

        this.firstFormGroup = this.fb.group({
            member_id: ['', Validators.required],
            loan_officer_id: ['', Validators.required],
            loan_type_id: ['', Validators.required],

            account_id: [{value: '', disabled: true}],
            id_number: [{value: '', disabled: true}],

            last_name: [{value: '', disabled: true}],
            phone: [{value: '', disabled: true}],

            interest_rate: [{value: '', disabled: true}],
         //   interest_type: [{value: '', disabled: true}],
            repayment_period: [{value: '', disabled: true}],
            payment_frequency: [{value: '', disabled: true}],

            application_date: [moment(), Validators.required],
            amount_applied: ['', Validators.required],
        });

        this.secondFormGroup = this.fb.group({
            disburse_method_id: [''],
            mpesa_number: [''],
            bank_name: [''],
            bank_branch: [''],
            bank_account: [''],
            other_banking_details: ['']
        });

        this.thirdFormGroup = this.fb.group({
            witness_type_id: ['', Validators.required],
            witness_first_name: [''],
            witness_last_name: [''],
            witness_country: [''],
            witness_county: [''],
            witness_city: [''],
            witness_national_id: [''],
            witness_phone: [''],
            witness_email: [''],
            witness_postal_address: [''],
            witness_residential_address: ['']
        });

        this.paymentMethodService.list(['name', 'display_name'])
            .subscribe((res) => this.paymentMethods = res,
                () => this.paymentMethods = []
            );

        this.witnessTypeService.list(['name', 'display_name'])
            .subscribe((res) => this.witnessTypes = res,
                () => this.witnessTypes = []
            );

    }

    /**
     *
     * @param file
     */
    onFileSelect(file: FileList) {
        if (file.length > 0) {
            this.fileToUpload = file.item(0);
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.fileUrl = event.target.result;
            };
            reader.readAsDataURL(this.fileToUpload);
        }
    }

    /**
     *
     * @param event
     */
    fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();


        }
    }

    /**
     *
     * @param file
     */
    applicationFormUpload(file: FileList) {

        if (file.length > 0) {
            this.applicationFormToUpload = file.item(0);

            const reader = new FileReader();

            reader.onload = (event: any) => {
                this.applicationFormUrl = event.target.result;
            };

            reader.readAsDataURL(this.applicationFormToUpload);

            //    this.form.get('passport_photo').setValue(this.profilePicFileToUpload);

        }
    }

    /**
     * Update supporting fields when member drop down changes content
     * @param value
     */
    onItemChange(value) {
        this.nationalID = this.members.find((item: any) => item.id === value).id_number;
        this.accountNumber = this.members.find((item: any) => item.id === value).account.account_number;
        this.memberAccounts = this.accounts.filter((item: any) => item.member_id === value);

        this.firstFormGroup.patchValue({
            id_number: this.nationalID,
            account_id: this.accountNumber,
        });
    }

    /**
     * Update supporting fields when LoanOfficer drop down changes content
     * @param value
     */
    onLoanOfficerItemChange(value) {
        this.lastName = this.users.find((item: any) => item.id === value).last_name;
        this.userPhone = this.users.find((item: any) => item.id === value).phone;

        this.firstFormGroup.patchValue({
            last_name: this.lastName,
            phone: this.userPhone,
        });
    }

    /**
     * Update supporting fields when Loan Type drop down changes content
     * @param value
     */
    onLoanTypeItemChange(value) {
        this.interestRate = this.loanTypes.find((item: any) => item.id === value).interest_rate;
        this.interestType = this.loanTypes.find((item: any) => item.id === value).interest_type.display_name;
        this.interestTypeId = this.loanTypes.find((item: any) => item.id === value).interest_type.id;
        this.serviceFee = this.loanTypes.find((item: any) => item.id === value).service_fee;

        this.penaltyTypeId = this.loanTypes.find((item: any) => item.id === value).penalty_type_id;
        this.penaltyValue = this.loanTypes.find((item: any) => item.id === value).penalty_value;
        this.penaltyFrequencyId = this.loanTypes.find((item: any) => item.id === value).penalty_frequency_id;

        this.repaymentPeriod = this.loanTypes.find((item: any) => item.id === value).repayment_period;
        this.repaymentFrequency = this.loanTypes.find((item: any) => item.id === value).payment_frequency.display_name;
        this.repaymentFrequencyId = this.loanTypes.find((item: any) => item.id === value).payment_frequency.id;

        this.reducePrincipalEarly = this.loanTypes.find((item: any) => item.id === value).reduce_principal_early;

        this.firstFormGroup.patchValue({
            interest_rate: this.interestRate +  ' ( ' + this.interestType + ' )',
           // interest_type: this.interestType,
            repayment_period: this.repaymentPeriod,
            payment_frequency: this.repaymentFrequency
        });

    }


    save() {
      //  this.dialogRef.close(this.form.value);
    }

    close() {
     //   this.dialogRef.close();
    }

    /**
     * Create loanApplication
     */
    create() {

        const data = {...this.firstFormGroup.value, ...this.secondFormGroup.value, ...this.thirdFormGroup.value};

        const body = Object.assign({}, this.loanApplication, data);
        body.interest_rate = this.interestRate;
        body.interest_type_id = this.interestTypeId;
        body.service_fee = this.serviceFee;

        body.penalty_type_id = this.penaltyTypeId;
        body.penalty_value = this.penaltyValue;
        body.penalty_frequency_id = this.penaltyFrequencyId;

        body.repayment_period = this.repaymentPeriod;
        body.payment_frequency_id = this.repaymentFrequencyId;
        body.reduce_principal_early = this.reducePrincipalEarly;

        const formData = new FormData();
        formData.append('loan_application_form', this.applicationFormToUpload);

        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                formData.append(key, body[key]);
            }
        }

        // body.periodic_payment_amount = 23000;
      //  body.attach_application_form = '';

        this.loader = true;

        console.log('Data BODY: ', formData);


        this.loanApplicationService.create(formData)
            .subscribe((res) => {
                    console.log('Create Source: ', res);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New Loan Application.');
                   // this.router.navigate(['/loan-applications']);
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
      //  this.form.reset();
        this.dialogRef.close(this.firstFormGroup.value);
    }

}

