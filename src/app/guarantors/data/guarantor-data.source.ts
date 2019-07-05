import { GuarantorService } from './guarantor.service';
import { BaseDataSource } from '../../shared/base-data-source';

export class MemberDataSource extends BaseDataSource {
    constructor(service: GuarantorService) {
        super(service);
    }
}
