import { BaseModel } from '../../shared/models/base-model';

export class MemberModel extends BaseModel {
    first_name: string;
    middle_name: string;
    last_name: string;
    nationality: string;
    id_number: string;
    passport_number: string;
    phone: string;
    email: string;
    postal_address: string;
    residential_address: string;
    bank_name: string;
    bank_account: string;
    bank_branch: string;
    status_id: string;
    passport_photo: string;
    national_id_image: string;
}
