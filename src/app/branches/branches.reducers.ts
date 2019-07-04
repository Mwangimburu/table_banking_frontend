import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Branch } from './model/branch';
import { BranchActions, BranchActionTypes } from './branch.actions';

export interface BranchesState extends EntityState<Branch> {
    loading: boolean;
    meta: {};
}

function sortById(b1: Branch, b2: Branch) {
    return b1.id === b2.id;
}

export const adapter: EntityAdapter<Branch> = createEntityAdapter<Branch>({
    sortComparer: false
});

const initialBranchState: BranchesState = adapter.getInitialState({
    loading: false,
    meta: {}
});

export function branchReducer(state = initialBranchState, action: BranchActions): BranchesState {
    switch (action.type) {
        case BranchActionTypes.BranchesLoaded:
            return adapter.addMany(action.payload.branches['data'], {...state, loading: false, meta: action.payload.branches['meta']});

        case BranchActionTypes.BranchesCancelled:
            return {
                ...state,
                loading: false
            };
        case BranchActionTypes.BranchesRequested:
            return {
                ...state,
                loading: true
            };

        default: {
            return state;
        }
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();

