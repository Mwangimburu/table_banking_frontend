import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FinanceStatementModel } from '../models/finance-statement.model';
import { BaseService } from '../../shared/base-service';

@Injectable({ providedIn: 'root' })
export class FinanceStatementService extends BaseService<FinanceStatementModel> {
    constructor(httpClient: HttpClient) {
        super( httpClient, 'finance_statements');
    }
}
