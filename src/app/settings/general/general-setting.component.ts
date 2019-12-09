import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralSettingModel } from './model/general-setting.model';
import { ActivatedRoute } from '@angular/router';
import { GeneralSettingService } from './data/general-setting.service';
import { NotificationService } from '../../shared/notification.service';
import { of } from 'rxjs';

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

    logoToUpload: File = null;
    logoUrl = '';
    showLogo: any;

    photoToUpload: File = null;
    photoName: any;
    photoUrl = '';
    showPhoto: any;

    settingId: string;


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
            currency: [''],
            phone: [''],
            country: [''],
            county: [''],
            town: [''],
            physical_address: [''],
            postal_address: [''],
            postal_code: [''],
           // logo: [''],
           // favicon: [''],
        });
    }

    ngOnInit(): void {

        if (this.route.snapshot.data['setting']) {
            this.setting = this.route.snapshot.data['setting'].data;
            this.prePopulateForm(this.setting);
            this.settingId = this.setting.id;
            // Fetch photo
            this.getImageFromService();
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
            currency: this.setting.currency,
            phone: this.setting.phone,
            country: this.setting.country,
            county: this.setting.county,
            town: this.setting.town,
            physical_address: this.setting.physical_address,
            postal_address: this.setting.postal_address,
            postal_code: this.setting.postal_code,
            logo: this.setting.logo
        });
    }

    onSubmit() {}

    /**
     *
     * @param file
     */
    onLogoSelect(file: FileList) {
        if (file.length > 0) {
            this.logoToUpload = file.item(0);
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.logoUrl = event.target.result;
            };
            reader.readAsDataURL(this.logoToUpload);
        }
    }

    /**
     *
     */
    getImageFromServicexx() {
        //  this.isImageLoading = true;
        if (this.setting && this.setting.logo !== null) {
            this.generalSettingService.fetchLogo(this.setting.logo).subscribe(data => {
                this.createImageFromBlob(data);
                // this.isImageLoading = false;
            }, error => {
                // this.isImageLoading = false;
                console.log('Error getting image from API');
                console.log(error);
            });
        }
    }

    /**
     *
     * @param image
     */
    createImageFromBlobxx(image: Blob) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.showLogo = reader.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    /**
     *
     * @param file
     */
    onProfilePhotoSelect(file: FileList) {
        if (file.length > 0) {
            this.photoToUpload = file.item(0);
            this.photoName = file.item(0).name;
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.photoUrl = event.target.result;
            };
            reader.readAsDataURL(this.photoToUpload);

            this.loader = true;
            // upload to server

            const formData = new FormData();
            formData.append('logo', this.photoToUpload);
            formData.append('id',  this.settingId);

            // Upload Photo
            this.uploadPhoto(formData);
        }
    }

    /**
     *
     */
    getImageFromService() {
        //  this.isImageLoading = true;
        if (this.setting && this.setting.logo !== null) {
            this.generalSettingService.fetchPhoto(this.settingId).subscribe(data => {
                this.createImageFromBlob(data);
                // this.isImageLoading = false;
            }, error => {
                // this.isImageLoading = false;
                console.log('Error getting image from API');
                console.log(error);
            });
        }
    }

    /**
     *
     * @param image
     */
    createImageFromBlob(image: Blob) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.showPhoto = of(reader.result);
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    /**
     * Upload profile image to server
     * @param formData
     */
    private uploadPhoto(formData: FormData) {
        // Upload photo
        this.generalSettingService.updatePhoto(formData)
            .subscribe((data) => {
                    this.loader = false;
                    this.getImageFromService();
                    // notify success
                    this.notification.showNotification('success', 'Success !! Logo has been updated.');
                },
                (error) => {
                    this.loader = false;
                    console.log('Error at Photo upload: ', error);
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


    /**
     * Update settings
     */
    update() {

        const body = Object.assign({}, this.setting, this.form.value);

        const formData = new FormData();
        formData.append('logo', this.logoToUpload);
        formData.append('id', body.id);

        this.loader = true;
        this.generalSettingService.update(body)
            .subscribe((data) => {
                    this.loader = false;
                    // notify success
                    this.notification.showNotification('success', 'Success !! Setting has been updated.');
                },
                (error) => {
                    this.loader = false;
                    console.log('Error at Setting update: ', error);

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

        // Upload logo
   /*     this.generalSettingService.updateLogo(formData)
            .subscribe((data) => {
                    this.loader = false;
                    // notify success
                    // this.notification.showNotification('success', 'Success !! Logo has been uploaded.');
                },
                (error) => {
                    this.loader = false;
                    console.log('Error at Logo upload: ', error);
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
                });*/
    }

}
