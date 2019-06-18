import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Branch } from '../model/branch';
import { BranchService } from './branch.service';
import { BranchDataSource } from './branch-data.source';

@Injectable({ providedIn: 'root' })
export class BranchResolverService implements Resolve<Branch> {

    dataSource: BranchDataSource;

    constructor(private service: BranchService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Branch {

      //  return this.dataSource.load('', 0, 0);
        return this.service.getAll('', 0, 0);
    }
}
