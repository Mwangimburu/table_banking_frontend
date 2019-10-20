import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoanModel } from '../models/loan-model';
import { BaseService } from '../../shared/base-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoanService extends BaseService<LoanModel> {
    private selectedLoanSource = new BehaviorSubject<LoanModel | null>(null);
    selectedLoanChanges$ = this.selectedLoanSource.asObservable();

    constructor(httpClient: HttpClient) {
        super( httpClient, 'loans');
    }

    changeSelectedLoan(selectedLoan: LoanModel | null ): void {
        this.selectedLoanSource.next(selectedLoan);
    }
}
