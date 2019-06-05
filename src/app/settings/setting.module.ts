import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';
import { EditSettingComponent } from './edit/edit-setting.component';
import { AddSettingComponent } from './add/add-setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';

@NgModule({
    imports: [
        MaterialModule,
        SettingRoutingModule
    ],
    declarations: [
        SettingComponent,
        EditSettingComponent,
        AddSettingComponent
    ]
})

export class SettingModule {}
