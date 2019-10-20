import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, take, tap } from 'rxjs/operators';
import { MemberService } from '../data/member.service';
import { MemberModel } from '../models/member-model';
import { EditMemberComponent } from '../edit/edit-member.component';
import { BranchService } from '../../settings/branch/general/data/branch.service';
import { PaymentService } from '../../payments/data/payment.service';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html'
})
export class MemberDetailComponent implements OnInit, AfterViewInit {

    paymentColumns = [
        'amount',
        'method_id',
        'date',
        'actions',
    ];

    loader = false;

    // Search field
    @ViewChild('search', {static: true}) search: ElementRef;
    // pagination
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    // Pagination
    length: number;
    pageIndex = 0;
    pageSizeOptions: number[] = [5, 10, 25, 50, 100];
    meta: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    paymentsDataSource = new MatTableDataSource();

    memberData: any;
    memberId = '';
    memberData$: any;

    members: any = [];
    memberTypes: any = [];
    step = 0;

    branches: any = [];

    constructor(private memberService: MemberService, private branchService: BranchService,
                private dialog: MatDialog, private paymentsService: PaymentService) {

        /* this.memberApplicationService.selectedLoanApplicationChanges$.subscribe(data => {
             console.log('At Guarantor ...passed member application ...');
             console.log(data);
             this.memberApplicationData = data
         });*/
    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }

    /**
     * Initialize data source
     * Set pagination data values
     * Initial data load
     */
    ngOnInit() {

        this.memberData$ = this.memberService.selectedMemberChanges$;

        this.memberService.selectedMemberChanges$.subscribe(data => {

            if (data) {
                this.memberData = data;
                this.memberId = data.id;

               // this.paymentsDataSource = new MatTableDataSource<{}>(data.payments);
               // this.paymentsDataSource = new MatTableDataSource<{}>();
            }
        });

        this.branchService.list('name')
            .subscribe((res) => this.branches = res,
                () => this.branches = []
            );
    }

    /**
     * Edit dialog launch
     */
    editDialog() {

     //   const id = member.id;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            member: this.memberData,
            branches: this.branches
        };

        const dialogRef = this.dialog.open(EditMemberComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (val) => {
                if ((val)) {
                    this.loadData();
                }
            }
        );
    }

    /**
     * Add dialog launch
     */
    addDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            members: this.members,
            memberApplicationId: this.memberId
        };

       /* const dialogRef = this.dialog.open(AddPaymentComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (val) => {
                if ((val)) {
                    this.loadData();
                }
            }
        );*/
    }


    /**
     * Handle search and pagination
     */
    ngAfterViewInit() {

       /* fromEvent(this.search.nativeElement, 'keyup')
            .pipe(
                debounceTime(1000),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadData();
                })
            ).subscribe();*/

       /* this.paginator.page.pipe(
            // startWith(null),
            tap(() => this.loadData() ),
            tap( () => console.log('Page Index: ' + (this.paginator.pageIndex + 1))),
            tap( () => console.log('Page Size: ' + (this.paginator.pageSize)))
        ).subscribe();*/

        // reset the paginator after sorting
        /*this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadData())
            )
            .subscribe();*/
    }

    /**
     * Fetch data from data lead
     */
    loadData() {
        /*console.log(this.sort.direction);
        this.dataSource.load(
            this.search.nativeElement.value,
            (this.paginator.pageIndex + 1),
            (this.paginator.pageSize),
            this.sort.active,
            this.sort.direction,
            'member_application_id',
            this.memberApplicationId
        );*/
    }

    /**
     * Empty search box
     */
    clearSearch() {
        this.search.nativeElement.value = '';
        this.loadData()
    }
}


