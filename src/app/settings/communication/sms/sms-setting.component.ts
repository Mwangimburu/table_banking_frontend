import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../../shared/notification.service';
import { EmailSettingService } from '../email/data/email-setting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailSettingModel } from '../email/model/email-setting.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-loan-type-setting',
    templateUrl: './sms-setting.component.html',
    styleUrls: ['./sms-setting.component.css']
})
export class SmsSettingComponent implements OnInit {
    form: FormGroup;
    setting: EmailSettingModel;
    formErrors: any;
    loader = false;

    constructor(private fb: FormBuilder, private route: ActivatedRoute,
                private notification: NotificationService, private emailSettingService: EmailSettingService) {

        this.form = this.fb.group({
            protocol: ['', [Validators.required,
                Validators.minLength(2)]],
            smpt_host: ['', [Validators.required,
                Validators.minLength(2)]],
            smpt_username: [''],
            smpt_password: [''],
            smpt_port: [''],
            mail_gun_domain: [''],
            mandrill_secret: [''],
            from_name: [''],
            from_email: ['']
        });
    }


    ngOnInit(): void {
        if (this.route.snapshot.data['setting']) {
            this.prePopulateForm(this.route.snapshot.data['setting'].data);
        }
    }

    /**
     *
     * @param setting
     */
    prePopulateForm(setting: EmailSettingModel) {
        this.setting = setting;

        this.form.patchValue({
            protocol: this.setting.protocol,
            smpt_host: this.setting.smpt_host,
            smpt_username: this.setting.smpt_username,
            smpt_password: this.setting.smpt_password,
            smpt_port: this.setting.smpt_port,
            mail_gun_domain: this.setting.mail_gun_domain,
            mandrill_secret: this.setting.mandrill_secret,
            from_name: this.setting.from_name,
            from_email: this.setting.from_email
        });
    }

    update() {
        const body = Object.assign({}, this.setting, this.form.value);

        this.loader = true;
        this.emailSettingService.update(body)
            .subscribe((data) => {
                    console.log('Update general Setting: ', data);
                    this.loader = false;

                    // notify success
                    this.notification.showNotification('success', 'Success !! Setting has been updated.');

                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit payment component: ', error);

                    if (error.payment === 0) {
                        // notify error
                        return;
                    }
                    // An array of all form errors as returned by server
                    this.formErrors = error;

                    if (this.formErrors) {
                        // loop through from fields, If has an error, mark as invalid so mat-error can show
                        for (const prop in this.formErrors) {
                            console.log('Hallo: ', prop);
                            if (this.form) {
                                this.form.controls[prop].setErrors({incorrect: true});
                            }
                        }
                    }
                });
    }
}
