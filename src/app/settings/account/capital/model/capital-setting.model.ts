import { BaseModel } from '../../../../shared/models/base-model';

export class CapitalSettingModel extends BaseModel {
    name: string;
    description: string;
    active_status: string;
    interest_rate: string;
    interest_type_id: string;
    service_fee: string;
    other_charges: string;
    max_period_in_months: string;
}
