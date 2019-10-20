import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportModel } from '../models/report-model';
import { BaseService } from '../../shared/base-service';

@Injectable({ providedIn: 'root' })
export class ReportService extends BaseService<ReportModel> {
    constructor(httpClient: HttpClient) {
        super( httpClient, 'reports');
    }
}
