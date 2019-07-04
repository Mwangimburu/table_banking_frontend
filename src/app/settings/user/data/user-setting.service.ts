import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../shared/base-service';
import { UserSettingModel } from '../model/user-setting.model';

@Injectable({ providedIn: 'root' })
export class UserSettingService extends BaseService<UserSettingModel> {
    constructor(httpClient: HttpClient) {
        super( httpClient, 'users');
    }
}
