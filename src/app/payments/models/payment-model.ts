import { BaseModel } from '../../shared/models/base-model';

export class PaymentModel extends BaseModel {
    loan_id: string;
    amount: string;
    method_id: string;
    date: string;
    paid_to: string;
    receipt_number: string;
    attachment: string;
    notes: string;
}
