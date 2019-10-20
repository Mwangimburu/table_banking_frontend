import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralSettingModel } from './model/general-setting.model';
import { ActivatedRoute } from '@angular/router';
import { GeneralSettingService } from './data/general-setting.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
    selector: 'app-general-setting',
    templateUrl: './general-setting.component.html',
    styleUrls: ['./general-setting.component.css']
})
export class GeneralSettingComponent implements OnInit {

    form: FormGroup;
    formErrors: any;
    loader = false;

    setting: GeneralSettingModel;

    constructor(private fb: FormBuilder, private route: ActivatedRoute,
                private generalSettingService: GeneralSettingService, private notification: NotificationService ) {

        this.form = this.fb.group({
            business_name: ['', [Validators.required,
                Validators.minLength(3)]],
            business_type: ['', [Validators.required,
                Validators.minLength(3)]],
            email: ['',
                [Validators.required,
                    Validators.minLength(3)]],
            contact_first_name: ['',
                [Validators.required,
                    Validators.minLength(3)]],
            contact_last_name: ['',
                [Validators.required,
                    Validators.minLength(3)]],
            currency: [''],
            phone: [''],
            country: [''],
            county: [''],
            town: [''],
            physical_address: [''],
            postal_address: [''],
            kra_pin: [''],
            logo: [''],
            favicon: [''],
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
    prePopulateForm(setting: GeneralSettingModel) {
        this.setting = setting;

        this.form.patchValue({
            business_name: this.setting.business_name,
            business_type: this.setting.business_type,
            email: this.setting.email,
            contact_first_name: this.setting.contact_first_name,
            contact_last_name: this.setting.contact_last_name,
            currency: this.setting.currency,
            phone: this.setting.phone,
            country: this.setting.country,
            county: this.setting.county,
            town: this.setting.town,
            physical_address: this.setting.physical_address,
            postal_address: this.setting.postal_address,
            kra_pin: this.setting.kra_pin,
            logo: this.setting.logo,
            favicon: this.setting.favicon
        });
    }

    onSubmit() {}


    update() {

        const body = Object.assign({}, this.setting, this.form.value);

        this.loader = true;
        this.generalSettingService.update(body)
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
