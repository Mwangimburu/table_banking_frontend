import { NgModule } from '@angular/core';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { MaterialModule } from '../shared/material.module';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HasPermissionDirective } from '../shared/directives/has-permission-directive';

@NgModule({
    imports: [
        MaterialModule,
        SettingRoutingModule,
    ],
    declarations: [
        SettingComponent,
       // HasPermissionDirective
    ]
})

export class SettingModule {}
