import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationGuarantorService } from '../../../members/view/payment/data/application-guarantor.service';
import { NotificationService } from '../../../shared/notification.service';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { LoanService } from '../../data/loan.service';
import { TransactionDataSource } from '../../../transactions/data/transaction-data.source';
import { PaymentModel } from '../../../payments/models/payment-model';
import { TransactionService } from '../../../transactions/data/transaction.service';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
    selector: 'app-application-guarantor',
    templateUrl: './view-loan-payments.component.html',
    styleUrls: ['./view-loan-payments.component.css']
})
export class ViewLoanPaymentsComponent implements OnInit, AfterViewInit {

    transactionColumns = [
        'loan_id',
        'payment_id',
        'amount',
        'transaction_date',
        'transaction_type'
    ];

    // Data for the list table display
    transactionDataSource: TransactionDataSource;
    // pagination
    @ViewChild(MatPaginator, {static: true }) paginator: MatPaginator;

    // Pagination
    length: number;
    pageIndex = 0;
    pageSizeOptions: number[] = [5, 10, 25, 50, 100];
    meta: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    payment: PaymentModel;
    loader = false;

    loanData: any;
    loanId = '';
    loanData$: any;

    constructor(private service: ApplicationGuarantorService,  private transactionService: TransactionService,
                private notification: NotificationService,
                private dialog: MatDialog, private loanService: LoanService) {}

    ngOnInit() {

        this.loanData$ = this.loanService.selectedLoanChanges$;
        this.loanService.selectedLoanChanges$.subscribe(data => {

            if (data) {
                this.loanData = data;
                this.loanId = data.id;
            }
        });

        this.transactionDataSource = new TransactionDataSource(this.transactionService);
        // Load pagination data
        this.transactionDataSource.meta$.subscribe((res) => this.meta = res);
        // We load initial data here to avoid affecting life cycle hooks if we load all data on after view init
        this.transactionDataSource.load('', 0, 0, 'amount', 'desc', 'loan_id', this.loanId);
    }

    /**
     * Fetch data from data lead
     */
    loadData() {
        this.transactionDataSource.load(
            '',
            (this.paginator.pageIndex + 1),
            (this.paginator.pageSize),
            this.sort.active,
            this.sort.direction,
            'loan_id', this.loanId
        );
    }

    /**
     * Handle search and pagination
     */
    ngAfterViewInit() {
        this.paginator.page.pipe(
            // startWith(null),
            tap(() => this.loadData() ),
            tap( () => console.log('Page Index: ' + (this.paginator.pageIndex + 1))),
            tap( () => console.log('Page Size: ' + (this.paginator.pageSize)))
        ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadData())
            )
            .subscribe();
    }

}
