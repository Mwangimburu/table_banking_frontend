import { BaseModel } from '../../shared/models/base-model';

export class AccountingModel extends BaseModel {
  /*  account_id: string;
    amount: string;
    method_id: string;
    transaction_id: string;
    payment_date: string;
    paid_by: string;
    payment_reason: string;
    receipt_number: string;
    attachment: string;
    notes: string;

    account: [];
    paymentMethod: [];*/

    branch_id: string;
    account_number: string;
    account_code: string;
    account_name: string; // Will be like member_id in some
    account_type_id: string;
    account_status_id: string;
    other_details: string;
    closed_on: string;

    created_by: string;
    updated_by: string;
    deleted_by: string;

    accountType: any;
    accountBalance: any;
    member: any;
    data: {statement: []};
}
