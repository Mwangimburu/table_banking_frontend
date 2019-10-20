import { NgModule } from '@angular/core';

import { SmsSettingRoutingModule } from './sms-setting-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import { SmsSettingComponent } from './sms-setting.component';
import { AddSmsComponent } from './add/add-sms.component';
import { EditSmsComponent } from './edit/edit-sms.component';

@NgModule({
    imports: [
        MaterialModule,
        SmsSettingRoutingModule,
    ],
    declarations: [
        SmsSettingComponent,
        AddSmsComponent,
        EditSmsComponent
    ],
    entryComponents: [
        AddSmsComponent,
        EditSmsComponent
    ]
})

export class SmsSettingModule {}
