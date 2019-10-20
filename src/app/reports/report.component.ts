import { Component, OnInit } from '@angular/core';
import { ReportService } from './data/report.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../settings/branch/general/data/branch.service';
import * as moment from 'moment';
import { ReportModel } from './models/report-model';
import { GeneralJournalService } from '../accounting/data/general-journal.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { branch } from '../auth/auth.selectors';


@Component({
    selector: 'app-payments',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    form: FormGroup;
    formErrors: any;

    branches: any;
    reportTypes: any;

    report: ReportModel;

    branchId: any;

    constructor(private service: ReportService, private fb: FormBuilder, private store: Store<AppState>,
                private branchService: BranchService, private reportService: ReportService) {
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
            report_type_id: ['', [Validators.required,
                Validators.minLength(1)]],
            branch_id: [this.branchId, [Validators.required,
                Validators.minLength(1)]],
        });

        this.branchService.list(['name'])
            .subscribe((res) => this.branches = res,
                () => this.branches = []
            );

        this.reportService.list(['display_name'])
            .subscribe((res) => this.reportTypes = res,
                () => this.reportTypes = []
            );
    }

    viewReport() {
        const body = Object.assign({}, this.report, this.form.value);
        console.log(body);
    }

    downloadPdf() {
        const body = Object.assign({}, this.report, this.form.value);
    }

    downloadExcel() {
        const body = Object.assign({}, this.report, this.form.value);
    }
}


