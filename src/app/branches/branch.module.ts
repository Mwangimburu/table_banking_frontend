import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';
import { EditBranchComponent } from './edit/edit-branch.component';
import { AddBranchComponent } from './add/add-branch.component';
import { BranchRoutingModule } from './branch-routing.module';
import { BranchComponent } from './branch.component';

@NgModule({
    imports: [
        MaterialModule,
        BranchRoutingModule
    ],
    declarations: [
        BranchComponent,
        EditBranchComponent,
        AddBranchComponent
    ]
})

export class BranchModule {}
