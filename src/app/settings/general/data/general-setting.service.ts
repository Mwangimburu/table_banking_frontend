import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../shared/base-service';
import { GeneralSettingModel } from '../model/general-setting.model';

@Injectable({ providedIn: 'root' })
export class GeneralSettingService extends BaseService<GeneralSettingModel> {
    constructor(httpClient: HttpClient) {
        super( httpClient, 'general_settings');
    }
}
