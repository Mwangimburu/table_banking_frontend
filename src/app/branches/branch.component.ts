import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../shared/delete/confirmation-dialog-component';
import { NotificationService } from '../shared/notification.service';
import { AddBranchComponent } from './add/add-branch.component';
import { Branch } from './model/branch';
import { EditBranchComponent } from './edit/edit-branch.component';
import { BranchDataSource } from './data/branch-data.source';
import { BranchService } from './data/branch.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { PageQuery } from './branch.actions';
import { BaseDataSource } from '../shared/base-data-source';
import { selectBranchesLoading, selectBranchesMeta } from './branch.selectors';

@Component({
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit, AfterViewInit {
    displayedColumns = [
        'branch_name',
        'branch_location',
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
   // meta: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    loading$: Observable<boolean>;
    meta$: Observable<any>;


    // Data for the list table display
    dataSource: BranchDataSource;

    constructor(private store: Store<AppState>, private service: BranchService,
                 private notification: NotificationService, private dialog: MatDialog) {
    }

    /**
     * Initialize data source
     * Set pagination data values
     * Initial data load
     */
    ngOnInit() {

        // this.dataSource = new BranchDataSource(this.service, this.store);
      // this.dataSource = new BaseDataSource(this.service, this.store);

        this.loading$ = this.store.pipe(select(selectBranchesLoading));
        this.meta$ = this.store.pipe(select(selectBranchesMeta));

       /* console.log('meta amen$');
        console.log(this.meta$);*/

        this.dataSource = new BranchDataSource(this.service);

        const initialPage: PageQuery = {
            pageIndex: 1,
            pageSize: 5
        };

      //  this.dataSource.loadBranches(initialPage);

      /*  this.meta = this.store.pipe(select(selectBranchesMeta));

        console.log('meta data');
        console.log(this.meta);
*/


       // console.log(this.dataSource);

        // Load pagination data
      /*  this.dataSource.meta$.subscribe((res) => {
           /!* console.log('meta data');
            console.log(res);*!/
            this.meta = res;
        } );*/

        // We load initial data here to avoid affecting life cycle hooks if we load all data on after view init

        this.dataSource.load('', 0, 0, 'branch_name', 'asc');

    }



/*    loadDataxx() {
        console.log(this.sort.direction);
        this.dataSource.load(
            this.search.nativeElement.value,
            (this.paginator.pageIndex + 1),
            (this.paginator.pageSize),
            this.sort.active,
            this.sort.direction
        );
    }*/


  /*  ngAfterViewInit() {
        console.log('At...ngAfterViewInit');

        this.paginator.page
            .pipe(
                tap(() => this.loadBranchesPage())
            )
            .subscribe();
    }*/

   /* loadBranchesPage() {

        const newPage: PageQuery = {
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize
        };

        this.dataSource.loadBranches(newPage);

    }*/

    /**
     * Add dialog launch
     */
    addDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(AddBranchComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (val) => {
                if ((val)) {
                  //  this.loadData();
                }
            }
        );
    }

    /**
     * Edit dialog launch
     */
    editDialog(branch: Branch) {

        const uuid = branch.id;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {branch};

        const dialogRef = this.dialog.open(EditBranchComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (val) => {
                if ((val)) {
                   // this.loadData();
                }
            }
        );
    }

    /**
     * Fetch data from data source
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
     * @param source
     */
    openConfirmationDialog(source: Branch) {

        this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            disableClose: true
        });
        //  this.dialogRef.componentInstance.confirmMessage = 'Confirm Permanent Delete.';

        this.dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.delete(source);
            }
            this.dialogRef = null;
        });
    }

    /**
     * Remove resource from db
     * @param source
     */
    delete(source: Branch) {
        this.loader = true;
        this.service.delete(source)
            .subscribe((data) => {
                    this.loader = false;
                 //   this.loadData();
                    this.notification.showNotification('success', 'Success !! Branch has been deleted.');
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
        // this.loadData()
    }
}




