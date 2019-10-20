import { BaseModel } from '../../shared/models/base-model';

export class PaymentModel extends BaseModel {
    account_id: string;
    amount: string;
    method_id: string;
    transaction_id: string;
    payment_date: string;
    paid_by: string;
    payment_reason: string;
    receipt_number: string;
    attachment: string;
    notes: string;

    member: any;
    branch: any;
    paymentMethod: any;
}
