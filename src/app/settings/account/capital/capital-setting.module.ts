import { NgModule } from '@angular/core';

import { CapitalSettingRoutingModule } from './capital-setting-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import { CapitalSettingComponent } from './capital-setting.component';
import { AddCapitalComponent } from './add/add-capital.component';
import { EditCapitalComponent } from './edit/edit-capital.component';

@NgModule({
    imports: [
        MaterialModule,
        CapitalSettingRoutingModule,
    ],
    declarations: [
        CapitalSettingComponent,
        AddCapitalComponent,
        EditCapitalComponent
    ],
    entryComponents: [
        AddCapitalComponent,
        EditCapitalComponent
    ]
})

export class CapitalSettingModule {}
