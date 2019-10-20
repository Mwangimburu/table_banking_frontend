import { Component, Input, OnInit } from '@angular/core';
import { ApplicationGuarantorService } from '../guarantor/data/application-guarantor.service';
import { NotificationService } from '../../../shared/notification.service';
import { MatDialog } from '@angular/material';
import { LoanApplicationService } from '../../data/loan-application.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-application-general',
    templateUrl: './view-application-general.component.html',
    styleUrls: ['./view-application-general.component.css']
})
export class ViewApplicationGeneralComponent implements OnInit {

    id: string;
    loanApplicationData: any;
    loanApplicationId = '';
    loanApplicationData$: any;

    step = 0;

    constructor(private service: ApplicationGuarantorService, private notification: NotificationService,
                private activeRoute: ActivatedRoute, private dialog: MatDialog,
                private loanApplicationService: LoanApplicationService,  private router: Router) {
    }

    ngOnInit() {

        this.loanApplicationData$ = this.loanApplicationService.selectedLoanApplicationChanges$;

        this.loanApplicationService.selectedLoanApplicationChanges$.subscribe(data => {

            if (data) {
                this.loanApplicationData = data;
                this.loanApplicationId = data.id;
            }
        });

        this.id = this.activeRoute.snapshot.params['id'];
    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }
}
