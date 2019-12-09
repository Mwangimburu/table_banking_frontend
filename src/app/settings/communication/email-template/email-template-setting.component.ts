import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../../shared/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailSettingModel } from '../email/model/email-setting.model';
import { ActivatedRoute } from '@angular/router';
import { EmailTemplateSettingService } from './data/email-template-setting.service';
import { EmailTemplateSettingModule } from './email-template-setting.module';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-loan-type-setting',
    templateUrl: './email-template-setting.component.html',
    styleUrls: ['./email-template-setting.component.css']
})
export class EmailTemplateSettingComponent implements OnInit {
    form: FormGroup;
    emailTemplate: EmailTemplateSettingModule;
    formErrors: any;
    loader = false;

    templates: any;

    templateId: any;
    name: any;
    subject: any;
    body: any;
    tags: any;

    public Editor = ClassicEditor;


    /**
     *
     * @param fb
     * @param route
     * @param notification
     * @param emailTemplateSettingService
     */
    constructor(private fb: FormBuilder, private route: ActivatedRoute,
                private notification: NotificationService, private emailTemplateSettingService: EmailTemplateSettingService) {

        this.form = this.fb.group({
            name: [{value: '', disabled: true}],
            template: ['', [Validators.required,
                Validators.minLength(2)]],
            subject: ['', [Validators.required,
                Validators.minLength(2)]],
            body: [''],
            tags: [{value: '', disabled: true}]
        });
    }


    /**
     *
     */
    ngOnInit(): void {
      this.fetchEmailTemplates();
    }

    /**
     *
     */
    fetchEmailTemplates() {
        this.emailTemplateSettingService.list(['name', 'display_name', 'subject', 'body', 'tags'])
            .subscribe((res) => this.templates = res,
                () => this.templates = []
            );
    }

    /**
     *
     * @param setting
     */
    prePopulateForm(setting: EmailSettingModel) {
       // this.setting = setting;
    }

    /**
     * Update supporting fields when Template drop down changes content
     * @param value
     */
    onTemplateItemChange(value) {
        this.templateId = this.templates.find((item: any) => item.id === value).id;
        this.name = this.templates.find((item: any) => item.id === value).name;
        this.subject = this.templates.find((item: any) => item.id === value).subject;
        this.body = this.templates.find((item: any) => item.id === value).body;
        this.tags = this.templates.find((item: any) => item.id === value).tags;

        this.form.patchValue({
            name: this.name,
            subject: this.subject,
            body: this.body,
            tags: this.tags
        });
    }


    /**
     *
     */
    update() {
        const body = Object.assign({}, this.emailTemplate, this.form.value);
        body.id = this.templateId;

        this.loader = true;
        this.emailTemplateSettingService.update(body)
            .subscribe((data) => {
                    console.log('Update email template: ', data);
                    this.loader = false;

                    // notify success
                    this.notification.showNotification('success', 'Success !!  Email Template has been updated.');
                    this.fetchEmailTemplates();
                },
                (error) => {
                    this.loader = false;
                    console.log('Error at edit  email template component: ', error);

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
