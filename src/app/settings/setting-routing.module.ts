import { Routes, RouterModule } from '@angular/router';
import { EditSettingComponent } from './edit/edit-setting.component';
import { AddSettingComponent } from './add/add-setting.component';
import { SettingComponent } from './setting.component';

export const ROUTES: Routes = [
    { path: '', component: SettingComponent },
    { path: ':id/edit', component: EditSettingComponent },
    { path: 'create', component: AddSettingComponent },
];

export const SettingRoutingModule = RouterModule.forChild(ROUTES);
