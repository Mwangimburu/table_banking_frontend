import { BranchService } from './branch.service';
import { BaseDataSource } from '../../shared/base-data-source';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';

export class BranchDataSource extends BaseDataSource {
    constructor(service: BranchService) {
        super(service);
    }
}
