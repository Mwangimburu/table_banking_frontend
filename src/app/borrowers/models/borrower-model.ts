import { BaseModel } from '../../shared/models/base-model';

export class BorrowerModel extends BaseModel {
    member_id: string;
    spouse_type: string;
    spouse_name: string;
    spouse_id_number: string;
    spouse_phone: string;
    spouse_address: string;
}
