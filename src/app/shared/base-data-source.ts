import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { BranchesRequested, PageQuery } from '../branches/branch.actions';
import { selectBranchesMeta, selectBranchesPage } from '../branches/branch.selectors';

export class BaseDataSource implements DataSource<any> {

    private dataSubject = new BehaviorSubject<any[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private metaSubject = new BehaviorSubject({});
    public meta$ = this.metaSubject.asObservable();

    constructor(private service: any) {}

    /**
     * Load paginated data
     * @param filter
     * @param page
     * @param limit
     * @param sortField
     * @param sortDirection
     */
    load(filter: string, page: number, limit: number, sortField: string = '', sortDirection: string = '') {

        console.log('load data from base data source');
        this.loadingSubject.next(true);

        this.service.getAll(filter, page, limit, sortField, sortDirection).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe((res) => {
                this.dataSubject.next(res['data']);
                this.metaSubject.next(res['meta']);
            } );
    }

    /**
     *
     * @param collectionViewer
     */
    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.dataSubject.asObservable();
    }

    /**
     *
     * @param collectionViewer
     */
    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

}
