import { Action } from '@ngrx/store';
import { Branch } from './model/branch';

export enum BranchActionTypes {
    BranchesRequested = '[Branches Page]  Branches Requested',
    BranchesLoaded = '[Branches API] Branches Loaded',
    BranchesCancelled = '[Branches API] Branches Cancelled',
}

export interface PageQuery {
    pageIndex: number;
    pageSize: number;
}

export class BranchesRequested implements Action {
    readonly type = BranchActionTypes.BranchesRequested;
    constructor(public payload: {page: PageQuery}) {
    }
}

export class BranchesLoaded implements Action {
    readonly type = BranchActionTypes.BranchesLoaded;
    constructor(public payload: {branches}) {
    }
}

export class BranchesCancelled implements Action {
    readonly type = BranchActionTypes.BranchesCancelled;
    constructor() {
        console.log('At BranchesCancelled');
    }
}

export type BranchActions = BranchesRequested | BranchesLoaded | BranchesCancelled;
