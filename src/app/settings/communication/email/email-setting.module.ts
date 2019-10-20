import { NgModule } from '@angular/core';

import { EmailSettingRoutingModule } from './email-setting-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import { EmailSettingComponent } from './email-setting.component';
import { AddEmailComponent } from './add/add-email.component';
import { EditEmailComponent } from './edit/edit-email.component';

@NgModule({
    imports: [
        MaterialModule,
        EmailSettingRoutingModule,
    ],
    declarations: [
        EmailSettingComponent,
        AddEmailComponent,
        EditEmailComponent
    ],
    entryComponents: [
        AddEmailComponent,
        EditEmailComponent
    ]
})

export class EmailSettingModule {}
