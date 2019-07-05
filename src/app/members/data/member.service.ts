import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberModel } from '../models/member-model';
import { BaseService } from '../../shared/base-service';

@Injectable({ providedIn: 'root' })
export class MemberService extends BaseService<MemberModel> {
    constructor(httpClient: HttpClient) {
        super( httpClient, 'members');
    }
}
