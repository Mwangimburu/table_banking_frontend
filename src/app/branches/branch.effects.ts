import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BranchService } from './data/branch.service';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { BranchActionTypes, BranchesCancelled, BranchesLoaded, BranchesRequested } from './branch.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class BranchEffects {

    @Effect()
    loadBranches$ = this.actions$
        .pipe(
            ofType<BranchesRequested>(BranchActionTypes.BranchesRequested),
            mergeMap(({payload}) =>
                this.branchService.fetchBranches(payload.page.pageIndex, payload.page.pageSize)
                    .pipe(
                        catchError(err => {
                            console.log('error loading a branches page ', err);
                            this.store.dispatch(new BranchesCancelled());
                            return of([]);
                        })
                    )
            ),
            map(branches => new BranchesLoaded({branches})),
        );

    constructor(private actions$: Actions, private branchService: BranchService, private store: Store<AppState>) {}
}
