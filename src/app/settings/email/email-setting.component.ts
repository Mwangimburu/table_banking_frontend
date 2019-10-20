import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmailSettingModel } from './model/email-setting.model';

@Component({
    selector: 'app-email-setting',
    templateUrl: './email-setting.component.html',
    styleUrls: ['./email-setting.component.css']
})
export class EmailSettingComponent {}
