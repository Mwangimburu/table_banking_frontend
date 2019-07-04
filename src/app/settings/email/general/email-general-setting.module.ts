import { NgModule } from '@angular/core';

import { EmailGeneralSettingRoutingModule } from './email-general-setting-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import { EmailGeneralSettingComponent } from './email-general-setting.component';

@NgModule({
    imports: [
        MaterialModule,
        EmailGeneralSettingRoutingModule,
    ],
    declarations: [
        EmailGeneralSettingComponent,
    ]
})

export class EmailGeneralSettingModule {}
