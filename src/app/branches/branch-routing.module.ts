import { Routes, RouterModule } from '@angular/router';
import { EditBranchComponent } from './edit/edit-branch.component';
import { AddBranchComponent } from './add/add-branch.component';
import { BranchComponent } from './branch.component';

export const ROUTES: Routes = [
    { path: '', component: BranchComponent },
    { path: ':id/edit', component: EditBranchComponent },
    { path: 'create', component: AddBranchComponent },
];

export const BranchRoutingModule = RouterModule.forChild(ROUTES);
