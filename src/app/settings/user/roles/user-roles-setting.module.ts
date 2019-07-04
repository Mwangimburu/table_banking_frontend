import { NgModule } from '@angular/core';

import { UserRolesSettingRoutingModule } from './user-roles-setting-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import { UserRolesSettingComponent } from './user-roles-setting.component';
import { AddRoleComponent } from './add/add-role.component';
import { EditRoleComponent } from './edit/edit-role.component';
import { AssignRoleComponent } from './assign/assign-role.component';

@NgModule({
    imports: [
        MaterialModule,
        UserRolesSettingRoutingModule,
    ],
    declarations: [
        UserRolesSettingComponent,
        AddRoleComponent,
        EditRoleComponent,
        AssignRoleComponent
    ],
    entryComponents: [
        AddRoleComponent,
        EditRoleComponent,
        AssignRoleComponent
    ]
})

export class UserRolesSettingModule {}
