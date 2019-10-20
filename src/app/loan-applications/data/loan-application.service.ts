import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoanApplicationModel } from '../models/loan-application-model';
import { BaseService } from '../../shared/base-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoanApplicationService extends BaseService<LoanApplicationModel> {

    private selectedLoanApplicationSource = new BehaviorSubject<LoanApplicationModel | null>(null);
    selectedLoanApplicationChanges$ = this.selectedLoanApplicationSource.asObservable();

    constructor(httpClient: HttpClient) {
        super( httpClient, 'loan_applications');
    }

    changeSelectedLoanApplication(selectedLoanApplication: LoanApplicationModel | null ): void {
        this.selectedLoanApplicationSource.next(selectedLoanApplication);
    }

}
