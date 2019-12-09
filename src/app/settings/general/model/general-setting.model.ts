import { BaseModel } from '../../../shared/models/base-model';

export class GeneralSettingModel extends BaseModel {
    business_name: string;
    business_type: string;
    email: string;
    phone: string;
    currency: string;
    country: string;
    county: string;
    town: string;
    physical_address: string;
    postal_address: string;
    postal_code: string;
    logo: File | null;

    favicon: string;
}
