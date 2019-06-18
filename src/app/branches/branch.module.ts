import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';
import { EditBranchComponent } from './edit/edit-branch.component';
import { AddBranchComponent } from './add/add-branch.component';
import { BranchRoutingModule } from './branch-routing.module';
import { BranchComponent } from './branch.component';
import { StoreModule } from '@ngrx/store';
import { branchReducer } from './branches.reducers';
import { EffectsModule } from '@ngrx/effects';
import { BranchEffects } from './branch.effects';

@NgModule({
    imports: [
        MaterialModule,
        BranchRoutingModule,
        StoreModule.forFeature('branches', branchReducer),
        EffectsModule.forFeature([BranchEffects])
    ],
    declarations: [
        BranchComponent,
        EditBranchComponent,
        AddBranchComponent,
    ],
    entryComponents: [
        EditBranchComponent,
        AddBranchComponent
    ],
})

export class BranchModule {}
