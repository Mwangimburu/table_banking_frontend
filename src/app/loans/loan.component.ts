import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../shared/delete/confirmation-dialog-component';
import { LoanService } from './data/loan.service';
import { AddLoanComponent } from './add/add-loan.component';
import { LoanModel } from './models/loan-model';
import { EditLoanComponent } from './edit/edit-loan.component';
import { LoanDataSource } from './data/loan-data.source';
import { NotificationService } from '../shared/notification.service';
import { LoanApplicationModel } from '../loan-applications/models/loan-application-model';
import { LoanAmortizationComponent } from './amortization/loan-amortization.component';

@Component({
    selector: 'app-loans',
    templateUrl: './loan.component.html',
    styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit, AfterViewInit {
    displayedColumns = [
        'member_id',
        'loan_reference_number',
        'loan_type_id',
        'repayment_period',
        'amount_approved',
        'balance',
        'next_repayment_date',
        'amortization',

        'actions',
    ];

    loader = false;

    dialogRef: MatDialogRef<ConfirmationDialogComponent>;

    // Search field
    @ViewChild('search', {static: false}) search: ElementRef;

    // pagination
    @ViewChild(MatPaginator, {static: true }) paginator: MatPaginator;

    // Pagination
    length: number;
    pageIndex = 0;
    pageSizeOptions: number[] = [5, 10, 25, 50, 100];
    meta: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    // Data for the list table display
    dataSource: LoanDataSource;
    selectedRowIndex = '';

    constructor(private service: LoanService, private notification: NotificationService, private dialog: MatDialog) {
    }

    /**
     * Initialize data lead
     * Set pagination data values
     * Initial data load
     */
    ngOnInit() {

        this.dataSource = new LoanDataSource(this.service);

        // Load pagination data
        this.dataSource.meta$.subscribe((res) => this.meta = res);

        // We load initial data here to avoid affecting life cycle hooks if we load all data on after view init
        this.dataSource.load('', 0, 0, 'updated_at', 'desc');

      /*  this.dataSource.connect(null).subscribe(data => {
            if (data && data.length > 0) {
                this.selectedRowIndex = data[0].id;
                this.onSelected(data[0]);
                console.log(data[0].id);
            }
        });*/

    }

  /*  onSelected(loan: LoanModel): void {
        this.selectedRowIndex = loan.id;
        this.service.changeSelectedLoan(loan);
    }*/

    /**
     * Add dialog launch
     */
    addDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(AddLoanComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (val) => {
                if ((val)) {
                    this.loadData();
                }
            }
        );
    }

    onSelected(loan: LoanModel): void {
        this.selectedRowIndex = loan.id;
        this.service.changeSelectedLoan(loan);
    }

    /**
     * Edit dialog launch
     */
    amortizationDialog(loan: LoanModel) {

        const id = loan.id;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {loan};

        const dialogRef = this.dialog.open(LoanAmortizationComponent, dialogConfig);
     /*   dialogRef.afterClosed().subscribe(
            (val) => {
                if ((val)) {
                    this.loadData();
                }
            }
        );*/
    }


    /**
     * Edit dialog launch
     */
    editDialog(lead: LoanModel) {

        const id = lead.id;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {lead};

        const dialogRef = this.dialog.open(EditLoanComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (val) => {
                if ((val)) {
                    this.loadData();
                }
            }
        );
    }

    /**
     * Fetch data from data lead
     */
    loadData() {
        console.log(this.sort.direction);
        this.dataSource.load(
            this.search.nativeElement.value,
            (this.paginator.pageIndex + 1),
            (this.paginator.pageSize),
            this.sort.active,
            this.sort.direction
        );
    }

    /**
     * Handle search and pagination
     */
    ngAfterViewInit() {

        fromEvent(this.search.nativeElement, 'keyup')
            .pipe(
                debounceTime(1000),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadData();
                })
            ).subscribe();

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

    /**
     * Open Edit form
     * @param lead
     */
    openConfirmationDialog(lead: LoanModel) {

        this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            disableClose: true
        });
        //  this.dialogRef.componentInstance.confirmMessage = 'Confirm Permanent Delete.';

        this.dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.delete(lead);
            }
            this.dialogRef = null;
        });
    }

    /**
     * Remove resource from db
     * @param lead
     */
    delete(lead: LoanModel) {
        this.loader = true;
        this.service.delete(lead)
            .subscribe((data) => {
                    this.loader = false;
                    this.loadData();
                    this.notification.showNotification('success', 'Success !! Lead has been deleted.');
                },
                (error) => {
                    this.loader = false;
                    if (!error.error['error']) {
                        this.notification.showNotification('danger', 'Connection Error !! Nothing deleted.' +
                            ' Check Connection and retry. ');
                    } else {
                        this.notification.showNotification('danger', 'Delete Error !! ');
                    }
                });
    }

    /**
     * Empty search box
     */
    clearSearch() {
        this.search.nativeElement.value = '';
        this.loadData()
    }
}


