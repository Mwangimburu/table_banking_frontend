import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmailSettingService } from './email-setting.service';
import { EmailSettingModel } from '../../model/email-setting.model';

@Injectable({ providedIn: 'root' })
export class EmailSettingResolverService implements Resolve<EmailSettingModel> {

    constructor(private service: EmailSettingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | EmailSettingModel {

        return this.service.getAll('', 1, 1);
    }
}
