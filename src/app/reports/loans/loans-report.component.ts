import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from '../../loan-applications/view/manage/application-manage.component';

@Component({
    selector: 'app-application-guarantor',
    templateUrl: './loans-report.component.html',
    styleUrls: ['./loans-report.component.css']
})
export class LoansReportComponent implements OnInit {
    form: FormGroup;
    formErrors: any;
    reports: any;
    constructor(private fb: FormBuilder) {

    }

    /**
     * Initialize data source
     * Set pagination data values
     * Initial data load
     */
    ngOnInit() {
        this.form = this.fb.group({
            start_date: [''],
            end_date: [''],
            report_id: [''],
        });
    }

}
