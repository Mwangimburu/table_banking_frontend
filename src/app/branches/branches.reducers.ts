import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Branch } from './model/branch';
import { BranchActions, BranchActionTypes } from './branch.actions';

export interface BranchesState extends EntityState<Branch> {

}

export const adapter: EntityAdapter<Branch> = createEntityAdapter<Branch>();

const initialBranchState: BranchesState = adapter.getInitialState();

export function branchReducer(state = initialBranchState, action: BranchActions): BranchesState {
    switch (action.type) {
        /*case BranchActionTypes.BranchesRequested:
            return {
                ...state
            };*/
        case BranchActionTypes.BranchesLoaded:
            return adapter.addMany(action.payload.branches['data'], state);
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

