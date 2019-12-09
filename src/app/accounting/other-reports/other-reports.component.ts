import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../../settings/branch/general/data/branch.service';
import * as moment from 'moment';
import { FinanceStatementService } from '../data/finance-statement.service';
import { FinanceStatementModel } from '../models/finance-statement.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { branch } from '../../auth/auth.selectors';
import { MatDialog } from '@angular/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReportService } from '../data/report.service';
/*import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';*/
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
    selector: 'app-ledger',
    templateUrl: './other-reports.component.html',
    styleUrls: ['./other-reports.component.css']
})
export class OtherReportsComponent implements OnInit {
    form: FormGroup;
    formErrors: any;

    branches: any;
    statementTypes: any;

    financeStatement: FinanceStatementModel;

    branchId: any;
    docDefinition: any;

    now: any;

    reportTypes: any;

    trialBalanceData: any;
    tableHeader = [
                {text: 'Account', style: 'tableHeader', alignment: 'center'},
                { text: 'DR', style: 'tableHeader', alignment: 'center' },
                {text: 'CR', style: 'tableHeader', alignment: 'center'}
            ];

    constructor(private reportService: ReportService, private fb: FormBuilder, private store: Store<AppState>,
                private branchService: BranchService, private financeStatementService: FinanceStatementService,
                private dialog: MatDialog) {
        this.store.pipe(select(branch)).subscribe(user => this.branchId = user);

        pdfMake.fonts = {
            Roboto: {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-MediumItalic.ttf'
            }
        };

        this.now = new Date();
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

        this.financeStatementService.list(['display_name'])
            .subscribe((res) => this.reportTypes = res,
                () => this.reportTypes = []
            );

       /* this.reportService.list(['display_name'])
            .subscribe((res) => this.reportTypes = res,
                () => this.reportTypes = []
            );*/

        this.reportService.getById(this.branchId)
            .subscribe((res) => {
                    // this.loader = false;
                    this.trialBalanceData = res;
                    // Add headers
                    this.trialBalanceData.unshift(this.tableHeader);

                    console.log('trial balance');
                    console.log(this.trialBalanceData);

                    this.docDefinition = this.definePdf(this.formatBodyData());
                   // this.docDefinition = this.definePdf(this.trialBalanceData);
                },
                () => {
                    // this.loader = false;
                    this.trialBalanceData = [];
                }
            );
    }

    formatBodyData() {
        return this.trialBalanceData.map(function (item) {
            return [
                {text: item[0], alignment: 'left'},
                {text: item[1], alignment: 'right'},
                {text: item[2], alignment: 'right'},
            ];
        });
    }

    definePdf(data: any) {
        return {
            content: [
                {text: 'Trial Balance', style: 'header'},
/*
                {text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
*/
                'SmartMicro, October 25th 2019' + this.now,
                {
                    style: 'tableExample',
                    table: {
                        headerRows: 1,
                        widths: [300, '*', '*'],
                        body: data
                    }
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tableExample: {
                    margin: [0, 5, 0, 15],
                    alignment: 'left'
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            },
            defaultStyle: {
                // alignment: 'justify'
            }
        };
    }

    /**
     *
     */
    downloadPdf() {
        const body = Object.assign({}, this.financeStatement, this.form.value);
        console.log(body);
    }

    viewStatement() {
       // pdfMake.createPdf(this.docDefinition).open();
        pdfMake.createPdf(this.docDefinition).download('trial_balance');
      //  var pdf = pdfMake.createPdf(this.docDefinition);
       // pdf.write('pdfs/tables.pdf');

      /*  PdfMakeWrapper.setFonts(pdfFonts);

        const pdf = new PdfMakeWrapper();

        pdf.add(this.text);

        pdf.create().download();

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;*/

       // const dialogRef = this.dialog.open(StatementComponent, dialogConfig);
    }

}
