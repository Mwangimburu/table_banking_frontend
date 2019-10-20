import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanApplicationModel } from '../models/loan-application-model';
import { LoanApplicationService } from '../data/loan-application.service';
import { NotificationService } from '../../shared/notification.service';
import { PaymentMethodSettingService } from '../../settings/payment/method/data/payment-method-setting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from '../../members/data/member.service';
import { LoanTypeSettingService } from '../../settings/loan/type/data/loan-type-setting.service';
import { WitnessTypeSettingService } from '../../settings/borrower/witness-type/data/witness-type-setting.service';

@Component({
    selector: 'app-edit-loan-application',
    styles: [],
    templateUrl: './edit-loan-application.component.html'
})
export class EditLoanApplicationComponent implements OnInit  {

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
    witnessTypes: any = [];
    disburseMethods: any = [];
    accounts: any = [];
    memberAccounts: any = [];

    nationalID = '';

    accountNumber = '';
    interestRate = '';
    interestType = '';
    interestTypeId = '';
    serviceFee: any;
    repaymentPeriod = '';

    options: string[] = ['One', 'Two', 'Three', 'Five'];
    filteredOptions: Observable<string[]>;

    @ViewChild('stepper', {static: true }) stepper: MatStepper;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder, private router: Router, private memberService: MemberService,
                private loanTypeService: LoanTypeSettingService,
                private notification: NotificationService, private loanApplicationService: LoanApplicationService,
                private memberMethodService: PaymentMethodSettingService,
                private paymentMethodService: PaymentMethodSettingService,
                private witnessTypeService: WitnessTypeSettingService,
                private dialogRef: MatDialogRef<EditLoanApplicationComponent>) {
        this.loanApplication = row.loanApplication;
        this.members = row.members;
        this.loanTypes = row.loanTypes;
    }

    ngOnInit() {

        this.nationalID = this.members.find((item: any) => item.id === this.loanApplication.member_id).id_number;
        this.accountNumber = this.members.find((item: any) => item.id === this.loanApplication.member_id).account.account_number;

        this.interestRate = this.loanTypes.find((item: any) => item.id === this.loanApplication.loan_type_id).interest_rate;
        this.interestType = this.loanTypes.find((item: any) => item.id === this.loanApplication.loan_type_id).interest_type.display_name;
        this.interestTypeId = this.loanTypes.find((item: any) => item.id === this.loanApplication.loan_type_id).interest_type.id;
        this.serviceFee = this.loanTypes.find((item: any) => item.id === this.loanApplication.loan_type_id).service_fee;
        this.repaymentPeriod = this.loanTypes.find((item: any) => item.id === this.loanApplication.loan_type_id).repayment_period;

        this.paymentMethodService.list(['name', 'display_name'])
            .subscribe((res) => this.disburseMethods = res,
                () => this.disburseMethods = []
            );

        this.witnessTypeService.list(['name'])
            .subscribe((res) => this.witnessTypes = res,
                () => this.witnessTypes = []
            );


        this.firstFormGroup = this.fb.group({
            member_id: [this.loanApplication.member_id, [Validators.required,
                Validators.minLength(3)]],
            loan_type_id: [this.loanApplication.loan_type_id, [Validators.required,
                Validators.minLength(3)]],
            account_id: [{value: this.accountNumber, disabled: true}],

            id_number: [{value: this.nationalID, disabled: true}],

            interest_rate: [{value: this.interestRate, disabled: true}],
            interest_type: [{value: this.interestType, disabled: true}],
            repayment_period: [{value: this.repaymentPeriod, disabled: true}],

            payment_frequency: [{value: this.loanApplication.payment_frequency, disabled: true}],


            application_date: [this.loanApplication.application_date, [Validators.required]],
            amount_applied: [this.loanApplication.amount_applied, [Validators.required]],
        });

        this.secondFormGroup = this.fb.group({
            disburse_method_id: [''],
            mpesa_number: [this.loanApplication.mpesa_number],
            bank_name: [this.loanApplication.bank_name],
            bank_branch: [this.loanApplication.bank_branch],
            bank_account: [this.loanApplication.bank_account],
            other_banking_details: [this.loanApplication.other_banking_details]
        });

        this.thirdFormGroup = this.fb.group({
            witness_type_id: [this.loanApplication.witness_type_id, Validators.required],
            witness_first_name: [this.loanApplication.witness_first_name],
            witness_last_name: [this.loanApplication.witness_last_name],
            witness_country: [this.loanApplication.witness_country],
            witness_county: [this.loanApplication.witness_county],
            witness_city: [this.loanApplication.witness_city],
            witness_national_id: [this.loanApplication.witness_national_id],
            witness_phone: [this.loanApplication.witness_phone],
            witness_email: [this.loanApplication.witness_email],
            witness_postal_address: [this.loanApplication.witness_postal_address],
            witness_residential_address: [this.loanApplication.witness_residential_address]
        });

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
     * Update supporting fields when Loan Type drop down changes content
     * @param value
     */
    onLoanTypeItemChange(value) {
        this.interestRate = this.loanTypes.find((item: any) => item.id === value).interest_rate;
        this.interestType = this.loanTypes.find((item: any) => item.id === value).interest_type.display_name;
        this.repaymentPeriod = this.loanTypes.find((item: any) => item.id === value).max_period_in_months;

        this.firstFormGroup.patchValue({
            interest_rate: this.interestRate,
            interest_type: this.interestType,
            max_period_in_months: this.repaymentPeriod
        });

    }

    /**
     *
     */
    update() {
        const data = {...this.firstFormGroup.value, ...this.secondFormGroup.value, ...this.thirdFormGroup.value};
        const body = Object.assign({}, this.loanApplication, data);
        body.interest_type_id = this.interestTypeId;
        body.service_fee = this.serviceFee;

        this.loader = true;

        this.loanApplicationService.update(body)
            .subscribe((res) => {
                    console.log('Create Source: ', res);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! Loan Application updated.');
                },
                (error) => {
                    this.loader = false;
                    if (error.lead === 0) {
                        this.notification.showNotification('danger', 'Connection Error !! Nothing updated.' +
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
