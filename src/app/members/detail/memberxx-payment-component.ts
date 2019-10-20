import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ConfirmationDialogComponent } from '../../shared/delete/confirmation-dialog-component';
import { PaymentDataSource } from '../../payments/data/payment-data.source';
import { PaymentService } from '../../payments/data/payment.service';
import { NotificationService } from '../../shared/notification.service';
import { AddPaymentComponent } from '../../payments/add/add-payment.component';
import { PaymentModel } from '../../payments/models/payment-model';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, take, tap } from 'rxjs/operators';
import { MemberService } from '../data/member.service';

@Component({
    selector: 'app-member-payments',
    templateUrl: './member-payment.component.html',
    styleUrls: ['./member-payment.component.css']
})
export class MemberxxPaymentComponent implements OnInit, AfterViewInit {
    displayedColumns = [
        'account',
        'amount',
        'method_id',
        'payment_date',
        'receipt_number',
        'actions',
    ];

    paymentColumns = [
        'amount',
        'method_id',
        'payment_date',
        'receipt_number'
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
    dataSource: PaymentDataSource;
    paymentsDataSource: PaymentDataSource;

    memberData: any;
    memberId = '';
    memberData$: any;

    constructor(private paymentsService: PaymentService, private notification: NotificationService,
                private dialog: MatDialog, private memberService: MemberService) {
    }

    /**
     * Initialize data lead
     * Set pagination data values
     * Initial data load
     */
    ngOnInit() {

        this.memberData$ = this.memberService.selectedMemberChanges$;

        this.paymentsDataSource = new PaymentDataSource(this.paymentsService);

        this.memberService.selectedMemberChanges$.subscribe(data => {

            if (data) {
                this.memberData = data;
                this.memberId = data.id;
          //      this.changes(data.id);
                // this.paymentsDataSource = new MatTableDataSource<{}>(data.payments);
              //  this.paymentsDataSource = new MatTableDataSource<{}>();

                /*    this.dataSource = new PaymentDataSource(this.paymentsService);

                    // Load pagination data
                    this.dataSource.meta$.subscribe((res) => this.meta = res);

                    // We load initial data here to avoid affecting life cycle hooks if we load all data on after view init
                    this.dataSource.load('', 0, 0, 'payment_date', 'desc', 'account_id', this.memberId);

    */
                // Load pagination data
                this.paymentsDataSource.meta$.subscribe((res) => this.meta = res);

                // We load initial data here to avoid affecting life cycle hooks if we load all data on after view init
                this.paymentsDataSource.load('', 0, 0, 'payment_date', 'desc');




            }
        });

    }

    changes(value) {
        console.log('changes');
        console.log(value);
    }

    /**
     * Add dialog launch
     */
    addDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(AddPaymentComponent, dialogConfig);
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
    openConfirmationDialog(lead: PaymentModel) {

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
    delete(lead: PaymentModel) {
        this.loader = true;
        this.paymentsService.delete(lead)
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
