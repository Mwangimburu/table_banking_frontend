import { BaseModel } from '../../../shared/models/base-model';

export class UserSettingModel extends BaseModel {
    role_id: string;
    email: string;
    first_name: string;
    last_name: string;
    salutation: string;
    password: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    address: string;
    postal_code: string;
    confirmed: string;
    confirmation_code: string;
    profile_picture: string;
}
