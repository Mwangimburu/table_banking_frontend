import { Component, Input, OnInit } from '@angular/core';
import { ApplicationGuarantorService } from '../payment/data/application-guarantor.service';
import { NotificationService } from '../../../shared/notification.service';
import { MatDialog } from '@angular/material';
import { MemberService } from '../../data/member.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-edit-application-general',
    templateUrl: './view-member-general.component.html',
    styleUrls: ['./view-member-general.component.css']
})
export class ViewMemberGeneralComponent implements OnInit {

    memberData: any;
    memberId = '';
    memberData$: any;

    profilePicUrl: string;
    profilePicFileToUpload: File = null;

    imageToShow: any;



    constructor(private service: ApplicationGuarantorService, private notification: NotificationService,
                private dialog: MatDialog, private memberService: MemberService) {}

    ngOnInit() {

        this.memberData$ = this.memberService.selectedMemberChanges$;
        this.memberService.selectedMemberChanges$.subscribe(data => {

            if (data) {
                this.memberData = data;
                this.memberId = data.id;

           //     this.getImageFromService();

             //   this.profilePicUrl = this.memberService.getImage(data.passport_photo);
            //    this.getImage(data.passport_photo);
               // this.displayProfilePic(this.memberService.getImage(data.passport_photo));
            }
        });
    }

    getImageFromService() {
      //  this.isImageLoading = true;
        this.memberService.getImage(this.memberData.passport_photo).subscribe(data => {
            this.createImageFromBlob(data);
           // this.isImageLoading = false;
        }, error => {
           // this.isImageLoading = false;
            console.log(error);
        });
    }

  /*  getImage(imageUrl: string): Observable<File> {
        return this.http
            .get(imageUrl, { responseType: ResponseContentType.Blob })
            .map((res: Response) => res.blob());
    }*/


    createImageFromBlob(image: Blob) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.imageToShow = reader.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }

   /* displayProfilePic(file: FileList) {
        this.profilePicFileToUpload = file.item(0);

        const reader = new FileReader();

        reader.onload = (event: any) => {
            this.profilePicUrl = event.target.result;
        };

        reader.readAsDataURL(this.profilePicFileToUpload);
    }*/
}
