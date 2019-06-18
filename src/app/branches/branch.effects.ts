import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BranchService } from './data/branch.service';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { BranchActionTypes, BranchesLoaded, BranchesRequested } from './branch.actions';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class BranchEffects {

    @Effect()
    loadBranches$ = this.actions$
        .pipe(
            ofType<BranchesRequested>(BranchActionTypes.BranchesRequested),
            mergeMap(({payload}) => this.branchService.fetchBranches(payload.page.pageIndex, payload.page.pageSize)),
            map(branches => new BranchesLoaded({branches})),
        );

    constructor(private actions$: Actions, private branchService: BranchService, private store: Store<AppState>) {}
}
