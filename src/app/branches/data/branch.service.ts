import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Branch } from '../model/branch';
import { BaseService } from '../../shared/base-service';

@Injectable({ providedIn: 'root' })
export class BranchService extends BaseService<Branch> {
    constructor(httpClient: HttpClient) {
        super( httpClient, 'branches');
    }
}
