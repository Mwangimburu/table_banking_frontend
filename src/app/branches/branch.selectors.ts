import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BranchesState } from './branches.reducers';
import * as fromBranch from './branches.reducers';
import { PageQuery } from './branch.actions';

export const selectBranchState = createFeatureSelector<BranchesState>('branches');

export const selectAllBranches = createSelector(
    selectBranchState,
    fromBranch.selectAll
);

export const selectBranchesPage = (page: PageQuery) => createSelector(
    selectAllBranches,
    allBranches => {
        console.log('...page at selector selectBranchesPage');
        console.log(page);

       // return allBranches;
      /*  console.log(allBranches.filter(branch => {})
            .slice(start, end));*/
        const start = page.pageIndex * page.pageSize,
                end = start + page.pageSize;

        console.log('Data at selector');
        console.log(allBranches.slice(start, end));

       return allBranches.slice(start, end);

       /* console.log(allBranches);
        /!*return allBranches
            .filter(branch => {})
            .slice(start, end); *!/
        return allBranches;*/
    }
);

export const selectBranchesLoading = createSelector(
    selectBranchState,
    branchesState => branchesState.loading
);


export const selectBranchesMeta = createSelector(
    selectBranchState,
    branchesState => branchesState.meta
);
