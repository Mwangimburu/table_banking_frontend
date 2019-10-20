import { BaseModel } from '../../shared/models/base-model';

export class DashboardModel extends BaseModel {
    business_name: string;
    business_type: string;
    contact_first_name: string;
    contact_last_name: string;
    email: string;
    phone: string;
    currency: string;
    country: string;
    county: string;
    town: string;
    physical_address: string;
    postal_address: string;
    kra_pin: string;
    logo: string;
    favicon: string;
}
