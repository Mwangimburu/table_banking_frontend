import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { EditMemberComponent } from './edit/edit-member.component';
import { AddMemberComponent } from './add/add-member.component';

export const ROUTES: Routes = [
    { path: '', component: MemberComponent },
    { path: ':id/edit', component: EditMemberComponent },
    { path: 'create', component: AddMemberComponent },
];


export const MemberRoutingModule = RouterModule.forChild(ROUTES);
