import { BaseModel } from '../../../../shared/models/base-model';

export class LoanTypeSettingModel extends BaseModel {
    name: string;
    description: string;
    active_status: string;
    interest_rate: string;
    interest_type_id: string;
    service_fee: string;
    payment_frequency_id: string;
    repayment_period: string;
    paymentFrequency: {};
}
