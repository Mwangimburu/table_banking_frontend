import { BaseModel } from '../../shared/models/base-model';

export class LoanApplicationModel extends BaseModel {
    member_id: string;
    reviewed_by_user_id: string;
    approved_by_user_id: string;
    application_date: string;
    amount_applied: string;
    repayment_period: string;
    date_approved: string;
    application_notes: string;
    status_id: string;
}
