import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ReportModel } from '../models/report-model';
import { ReportService } from './report.service';
import { ReportDataSource } from './report-data.source';

@Injectable({ providedIn: 'root' })
export class ReportResolverService implements Resolve<ReportModel> {

    dataSource: ReportDataSource;

    constructor(private service: ReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | ReportModel {

      //  return this.dataSource.load('', 0, 0);
        return this.service.getAll('', 0, 0);
    }
}
