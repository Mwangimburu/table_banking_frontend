import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardModel } from '../model/dashboard.model';
import { BaseService } from '../../shared/base-service';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService<DashboardModel> {
    constructor(httpClient: HttpClient) {
        super( httpClient, 'summaries');
    }
}
