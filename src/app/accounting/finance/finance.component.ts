import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../../settings/branch/general/data/branch.service';
import * as moment from 'moment';
import { FinanceStatementService } from '../data/finance-statement.service';
import { FinanceStatementModel } from '../models/finance-statement.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { branch, settings } from '../../auth/auth.selectors';
import { MatDialog } from '@angular/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReportService } from '../data/report.service';
/*import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';*/
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
    branchName: any;
    statementName: any;
    docDefinition: any;

    now: any;
    loader = false;

    trialBalanceData: any;
    incomeStatementData: any;
    currentSettings$: any;
    businessName: any;

    tableHeader = [
                {text: 'Account', style: 'tableHeader', alignment: 'center'},
                { text: 'DR', style: 'tableHeader', alignment: 'center' },
                {text: 'CR', style: 'tableHeader', alignment: 'center'}
            ];

    incomeStatementHeader = [
        {text: 'Account', style: 'tableHeader', alignment: 'center'},
        { text: 'Amount', style: 'tableHeader', alignment: 'center' }
    ];

    constructor(private reportService: ReportService,private fb: FormBuilder, private store: Store<AppState>,
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
        this.currentSettings$ = this.store.pipe(select(settings));
        this.currentSettings$.subscribe(res => {
            if (res)
                this.businessName = res.business_name
        });

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

        this.financeStatementService.list(['name', 'display_name'])
            .subscribe((res) => this.statementTypes = res,
                () => this.statementTypes = []
            );

      /*  this.reportService.getById(this.branchId)
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
            );*/
    }

    formatTrialBalanceBody() {
        return this.trialBalanceData.map(function (item) {
            return [
                {text: item[0], alignment: 'left'},
                {text: item[1], alignment: 'right'},
                {text: item[2], alignment: 'right'},
            ];
        });
    }

    formatIncomeStatementBody() {
        return this.incomeStatementData.map(function (item) {
            return [
                {text: item[0], alignment: 'left'},
                {text: item[1], alignment: 'right'},
            ];
        });
    }

    defineTrialBalancePdf(data: any) {
        return {
            content: [
                {text: this.businessName + '. ' + this.branchName + ' Branch ', style: 'header'},
                {text: 'Trial Balance', style: 'subheader'},
                {text: '' + this.now, alignment: 'center'},
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
                    fontSize: 15,
                    bold: true,
                    margin: [0, 0, 0, 5],
                    alignment: 'center'
                },
                subheader: {
                    fontSize: 13,
                    bold: true,
                    margin: [0, 10, 0, 5],
                    alignment: 'center'
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


    defineIncomeStatementPdf(data: any) {
        return {
            content: [
                {text: this.businessName + '. ' + this.branchName + ' Branch ', style: 'header'},
                {text: 'Income Statement', style: 'subheader'},
                {text: '' + this.now, alignment: 'center'},
                {
                    style: 'tableExample',
                    table: {
                        headerRows: 1,
                        widths: [300, '*'],
                        body: data
                    }
                },
            ],
            styles: {
                header: {
                    fontSize: 15,
                    bold: true,
                    margin: [0, 0, 0, 5],
                    alignment: 'center'
                },
                subheader: {
                    fontSize: 13,
                    bold: true,
                    margin: [0, 10, 0, 5],
                    alignment: 'center'
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
        this.loader = true;
        this.branchName = this.branches.find((item: any) => item.id === body.branch_id).name;
        this.statementName = this.statementTypes.find((item: any) => item.id === body.statement_type_id).name;

        console.log('this.statementName');
        console.log(this.statementName);

        switch (this.statementName) {
            case 'trial_balance' : {
                this.financeStatementService.create(body)
                    .subscribe((res) => {
                            this.trialBalanceData = res;
                            // Add headers
                            this.trialBalanceData.unshift(this.tableHeader);

                            console.log('trial balance');
                            console.log(this.trialBalanceData);

                            this.docDefinition = this.defineTrialBalancePdf(this.formatTrialBalanceBody());
                            this.loader = false;
                            pdfMake.createPdf(this.docDefinition).download(this.branchName + '_trial_balance');
                            },
                        () => {
                            // this.loader = false;
                            this.trialBalanceData = [];
                        }
                    );
            }
            break;
            case 'income_statement': {
                this.financeStatementService.create(body)
                    .subscribe((res) => {
                            this.incomeStatementData = res;
                            // Add headers
                            this.incomeStatementData.unshift(this.incomeStatementHeader);

                            console.log('incomeStatementData balance');
                            console.log(this.incomeStatementData);

                            this.docDefinition = this.defineIncomeStatementPdf(this.formatIncomeStatementBody());
                            this.loader = false;
                            pdfMake.createPdf(this.docDefinition).download(this.branchName + '_income_statement');
                        },
                        () => {
                            // this.loader = false;
                            this.incomeStatementData = [];
                        }
                    );
            }
            break;
            default: {

            }
        }
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
