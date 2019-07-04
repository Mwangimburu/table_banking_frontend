import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoanModel } from '../models/loan-model';
import { BaseService } from '../../shared/base-service';

@Injectable({ providedIn: 'root' })
export class LoanService extends BaseService<LoanModel> {
    constructor(httpClient: HttpClient) {
        super( httpClient, 'loans');
    }
}
