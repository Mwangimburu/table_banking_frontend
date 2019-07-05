import { BaseModel } from '../../shared/models/base-model';

export class GuarantorModel extends BaseModel {
    member_id: string;
    loan_id: string;
}
