import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { fromEvent, merge, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../../shared/delete/confirmation-dialog-component';
import { ApplicationManageDataSource } from './data/application-manage-data.source';
import { ApplicationManageService } from './data/application-manage.service';
import { ApplicationManageModel } from './model/application-manage.model';
import { NotificationService } from '../../../shared/notification.service';
import { LoanApplicationService } from '../../data/loan-application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanModel } from '../../../loans/models/loan-model';
import { LoanService } from '../../../loans/data/loan.service';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
    selector: 'app-application-manage',
    templateUrl: './application-manage.component.html',
    styleUrls: ['./application-manage.component.css']
})
export class ApplicationManageComponent implements OnInit, OnDestroy {
    form: FormGroup;

    formErrors: any;

    method: ApplicationManageModel;

    loader = false;

    loanApplicationData: any;
    loanApplicationId = '';
    loanApplicationData$: any;

    loanAmountValue: string;
    public loanAmountModelChanged: Subject<string> = new Subject<string>();
    public loanAmountModelChangeSubscription: Subscription;

    repaymentPeriodValue: string;
    public repaymentPeriodModelChanged: Subject<string> = new Subject<string>();
    public repaymentPeriodModelChangeSubscription: Subscription;

    interestRateValue: string;
    public interestRateModelChanged: Subject<string> = new Subject<string>();
    public interestRateModelChangeSubscription: Subscription;

    periodicPayments: number;

    loan: LoanModel;

    constructor(private fb: FormBuilder, private router: Router,
                private methodService: ApplicationManageService, private loanService: LoanService,
                private notification: NotificationService, private loanApplicationService: LoanApplicationService) {

        this.loanApplicationData$ = this.loanApplicationService.selectedLoanApplicationChanges$;
        this.loanApplicationService.selectedLoanApplicationChanges$.subscribe(data => {
            if (data) {
                this.loanApplicationData = data;
                this.loanApplicationId = data.id;
            }
        });


    }

    ngOnInit() {
        this.periodicPayments = this.calculatePayment(
            this.loanApplicationData.amount_applied,
            this.loanApplicationData.repayment_period,
            this.loanApplicationData.interest_rate,
            2
        );


        this.form = this.fb.group({
            amount_applied: [{value: this.loanApplicationData.amount_applied, disabled: true}],
            service_fee: [this.loanApplicationData.service_fee],
            amount_approved: [this.loanApplicationData.amount_applied],
            amount_to_disburse: [(this.loanApplicationData.amount_applied) - (this.loanApplicationData.service_fee)],

            loan_type: [{value: this.loanApplicationData.loanType.name, disabled: true}],
            interest_type: [{value: this.loanApplicationData.loanType.interestType.display_name, disabled: true}],
            interest_rate: [this.loanApplicationData.interest_rate],
            repayment_period: [this.loanApplicationData.repayment_period	],
            periodic_payments: [this.periodicPayments],
            start_date: [moment(), Validators.required],
            member_id: [{value: this.loanApplicationData.member.first_name, disabled: true}],
            review_notes: [''],
            collateral_check: ['', Validators.required],
            guarantor_check: ['', Validators.required],

        });


        this.loanAmountModelChangeSubscription = this.loanAmountModelChanged
            .pipe(
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe(newValue => {
                this.periodicPayments = this.calculatePayment(
                  newValue,
                  this.form.get('repayment_period').value,
                  this.form.get('interest_rate').value,
                    2
              );

                this.form.patchValue({
                    periodic_payments: this.periodicPayments
                });

            });

        this.repaymentPeriodModelChangeSubscription = this.repaymentPeriodModelChanged
            .pipe(
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe(newValue => {
                this.periodicPayments = this.calculatePayment(
                    this.form.get('amount_approved').value,
                    newValue,
                    this.form.get('interest_rate').value,
                    2
                );
                this.form.patchValue({
                    periodic_payments: this.periodicPayments
                });
            });

        this.interestRateModelChangeSubscription = this.interestRateModelChanged
            .pipe(
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe(newValue => {
                this.interestRateValue = newValue;

                this.periodicPayments = this.calculatePayment(
                    this.form.get('amount_approved').value,
                    this.form.get('repayment_period').value,
                    newValue,
                    2
                );
                this.form.patchValue({
                    periodic_payments: this.periodicPayments
                });
            });
    }

    calculatePayment($loanAmount, $totalPeriods, $interest, $accuracy) {
        $interest    = $interest / 100;    // convert to a percentage
        const $value1 = $interest * Math.pow((1 + $interest), $totalPeriods);
        const $value2 = Math.pow((1 + $interest), $totalPeriods) - 1;
        const $payment    = +($loanAmount * ($value1 / $value2));
// $accuracy specifies the number of decimal places required in the result
       // $payment    = number_format($payment, $accuracy, '.', '');

        return $payment;

    }

    calculatePaymentFixed(loanAmount, totalPeriods, interest, interestType) {
        interest = interest / 100;
        if (interestType === 'fixed') {
            return +(( loanAmount / totalPeriods ) + ( interest * loanAmount ));
        } else if (interestType === 'reducing_balance') {
            const $value1 = interest * Math.pow((1 + interest), totalPeriods);
            const $value2 = Math.pow((1 + interest), totalPeriods) - 1;
            return +(loanAmount * ($value1 / $value2));
        }
    }

    covertToLoan() {
        /*console.log('create loan');
        console.log(this.loanApplicationData);*/
        //  const body = Object.assign({}, this.loan, this.form.value);
     //   const body = Object.assign({}, this.loan, this.loanApplicationData);
        const body = Object.assign({}, this.loan, this.form.value);

        body.loan_application_id = this.loanApplicationData.id;
        body.member_id = this.loanApplicationData.member_id;
        body.interest_rate = this.loanApplicationData.interest_rate;
        body.interest_type_id = this.loanApplicationData.interest_type_id;
        body.payment_period = this.loanApplicationData.payment_period;
        body.amount_approved = this.form.value.amount_approved;
        body.payment_frequency_id = this.loanApplicationData.payment_frequency_id;
        body.service_fee = this.loanApplicationData.service_fee;
        body.loan_type_id = this.loanApplicationData.loan_type_id;

        // xxx
        //  body.member_id = this.form.value.amount_disbursed;
       // body.loan_application_id = this.loanApplicationData.id;
        //  body.loan_type_id = this.form.value.amount_disbursed;

        // body.interest_rate = this.form.value.amount_disbursed;
     //   body.interest_type_id = this.form.value.amount_disbursed;
        //  body.repayment_period = this.form.value.amount_disbursed;

        // ****    body.loan_status_id = this.form.value.amount_disbursed;
        // ***  body.approved_by_user_id = this.form.value.amount_disbursed;

      //  body.amount_approved = this.form.value.amount_approved;
        //  body.loan_disbursed = this.form.value.amount_disbursed;

     //   body.start_date = this.form.value.amount_disbursed;

    //    body.payment_frequency_id = this.form.value.amount_disbursed;
    //   body.next_repayment_date = this.form.value.amount_disbursed;

        console.log('create loan ..body');
        console.log(body);

        this.loader = true;

        this.loanService.create(body)
            .subscribe((data) => {
                    console.log('Create Source: ', data);
                    this.onSaveComplete();
                    this.notification.showNotification('success', 'Success !! New loan created.');
                    this.router.navigate(['/loans']);
                },
                (error) => {
                    this.loader = false;
                    if (error.member === 0) {
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
                            if (prop === 'member_id') {
                                this.notification.showNotification('danger', error.member_id[0]);
                            }
                            if (this.form) {
                                this.form.controls[prop].setErrors({incorrect: true});
                            }
                        }
                    }

                });
    }

    rejectLoanApplication() {
        const body = Object.assign({}, this.loan, this.loanApplicationData);

        body.review = true;
        body.rejection_notes = this.form.value.notes;


        this.loader = true;
        this.loanApplicationService.update(body)
            .subscribe((data) => {
                    console.log('Update member: ', data);
                    this.loader = false;
                    // notify success
                    this.notification.showNotification('success', 'Success !! Loan Application has been updated.');
                    this.router.navigate(['/loan-applications']);
                },
                (error) => {
                    this.loader = false;

                    if (error.member === 0) {
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

    /**
     *
     */
    public onSaveComplete(): void {
        this.loader = false;
        this.form.reset();
      //  this.dialogRef.close(this.form.value);
    }

    ngOnDestroy() {
        this.loanAmountModelChangeSubscription.unsubscribe();
        this.repaymentPeriodModelChangeSubscription.unsubscribe();
        this.interestRateModelChangeSubscription.unsubscribe();
    }
}
