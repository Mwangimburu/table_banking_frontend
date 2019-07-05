import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoanApplicationModel } from '../models/loan-application-model';
import { BaseService } from '../../shared/base-service';

@Injectable({ providedIn: 'root' })
export class LoanApplicationService extends BaseService<LoanApplicationModel> {
    constructor(httpClient: HttpClient) {
        super( httpClient, 'loan_applications');
    }
}
