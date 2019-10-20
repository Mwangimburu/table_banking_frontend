import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';
import { AccountingModel } from '../models/accounting-model';
import { AccountingService } from '../data/accounting.service';

@Component({
    selector: 'app-loan-amortization',
    styleUrls: ['./statement.component.css'],
    templateUrl: './statement.component.html'
})
export class StatementComponent implements OnInit  {

    account: AccountingModel;

    loanAmount: any;
    totalPeriods: any;
    interest: any;

    loader = false;

    table: any;

    @ViewChild('stepper', {static: true }) stepper: MatStepper;

    tableColumns = [
        'date',
        'narration',
        'debit',
        'credit',
        'balance'
    ];

    dataSource: any;

    constructor(@Inject(MAT_DIALOG_DATA) row: any,
                private fb: FormBuilder,
                private accountingService: AccountingService,
                private notification: NotificationService,
                private dialogRef: MatDialogRef<StatementComponent>) {
        this.account = row.account;
    }

    ngOnInit() {
        this.loader = true;
        this.accountingService.getById(this.account.id)
            .subscribe((res) => {
                    this.loader = false;
                    console.log(res);
                    this.dataSource = res.data.statement;
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
