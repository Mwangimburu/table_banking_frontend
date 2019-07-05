import { NgModule } from '@angular/core';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { MaterialModule } from '../shared/material.module';
import { EditMemberComponent } from './edit/edit-member.component';
import { AddMemberComponent } from './add/add-member.component';

@NgModule({
    imports: [
        MaterialModule,
        MemberRoutingModule,
    ],
    declarations: [
        MemberComponent,
        EditMemberComponent,
        AddMemberComponent
    ],
    entryComponents: [
        EditMemberComponent,
        AddMemberComponent
    ]
})

export class MemberModule {}
