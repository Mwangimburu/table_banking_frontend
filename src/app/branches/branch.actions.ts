import { Action } from '@ngrx/store';
import { Branch } from './model/branch';

export enum BranchActionTypes {
    BranchesRequested = '[Branches Page]  Branches Requested',
    BranchesLoaded = '[Branches API] Branches Loaded',
    BranchesCancelled = '[Branches API] Branches Cancelled'
}

export interface PageQuery {
    pageIndex: number;
    pageSize: number;
}

export class BranchesRequested implements Action {
    readonly type = BranchActionTypes.BranchesRequested;
    constructor(public payload: {page: PageQuery}) {
        console.log('BranchesRequested...xx');
    }
}

export class BranchesLoaded implements Action {
    readonly type = BranchActionTypes.BranchesLoaded;
    constructor(public payload: {branches}) {
        console.log('BranchesLoaded...xx');
        console.log(payload.branches['data']);

    }
}

export class BranchesCancelled implements Action {
    readonly type = BranchActionTypes.BranchesCancelled;
}

export type BranchActions = BranchesRequested | BranchesLoaded | BranchesCancelled;
