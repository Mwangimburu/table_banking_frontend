import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanModel } from '../models/loan-model';
import { LoanService } from '../data/loan.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
    selector: 'app-loan-amortization',
    styleUrls: ['./loan-amortization.component.css'],
    templateUrl: './loan-amortization.component.html'
})
export class LoanAmortizationComponent implements OnInit  {

    loan: LoanModel;

    loanAmount: any;
    totalPeriods: any;
    interest: any;

    loader = false;

    table: any;

    @ViewChild('stepper', {static: true }) stepper: MatStepper;

    tableColumns = [
        'count',
        'due_date',
        'payment',
        'interest',
        'principal',
        'balance'
    ];

    dataSource: any;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private loanService: LoanService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<LoanAmortizationComponent>) {
        this.loan = row.loan;
        this.loanAmount = this.loan.amount_approved;
        this.totalPeriods = this.loan.payment_period;
        this.interest = this.loan.interest_rate;
    }

    ngOnInit() {
        this.loader = true;
        this.loanService.getById(this.loan.id)
            .subscribe((res) => {
                    this.loader = false;
                  //  console.log(res.data.amortization);
                    this.dataSource = res.data.amortization;
                },
                () => {
                    this.loader = false;
                    this.dataSource = [];
                }
            );
    }


    close() {
        this.dialogRef.close();
    }

}
