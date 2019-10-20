import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../reports/data/report.service';
import { BranchService } from '../../settings/branch/general/data/branch.service';
import * as moment from 'moment';
import { FinanceStatementService } from '../data/finance-statement.service';
import { FinanceStatementModel } from '../models/finance-statement.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { branch } from '../../auth/auth.selectors';


@Component({
    selector: 'app-ledger',
    templateUrl: './finance.component.html',
    styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
    form: FormGroup;
    formErrors: any;

    branches: any;
    statementTypes: any;

    financeStatement: FinanceStatementModel;

    branchId: any;

    constructor(private service: ReportService, private fb: FormBuilder, private store: Store<AppState>,
                private branchService: BranchService, private financeStatementService: FinanceStatementService) {
        this.store.pipe(select(branch)).subscribe(user => this.branchId = user);
    }

    /**
     *
     */
    ngOnInit() {
        this.form = this.fb.group({
            start_date: ['', [Validators.required,
                Validators.minLength(3)]],
            end_date: [moment()],
            statement_type_id: ['', [Validators.required,
                Validators.minLength(1)]],
            branch_id: [this.branchId, [Validators.required,
                Validators.minLength(1)]],
        });

        this.branchService.list(['name'])
            .subscribe((res) => this.branches = res,
                () => this.branches = []
            );

        this.financeStatementService.list(['display_name'])
            .subscribe((res) => this.statementTypes = res,
                () => this.statementTypes = []
            );
    }

    /**
     *
     */
    downloadPdf() {
        const body = Object.assign({}, this.financeStatement, this.form.value);
        console.log(body);
    }

}
