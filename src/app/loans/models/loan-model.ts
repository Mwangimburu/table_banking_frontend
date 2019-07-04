import { BaseModel } from '../../shared/models/base-model';

export class LoanModel extends BaseModel {
    company_id: string;
    title: string;
    lead_owner_id: string;
    status_id: string;
    source_id: string;
    type_id: string;
    amount: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    mobile: string;
    preferred_comm: string;
    address1: string;
    address2: string;
    zip_code: string;
    country: string;
    state: string;
    city: string;
    organization: string;
    industry: string;
    website: string;
    notes: string;

    borrower_id: string;
    loan_application_id: string;
    loan_type_id: string;
    loan_status_id: string;
    branch_id: string;
    approved_by_user_id: string;
    loan_reference: string;
    amount_applied: string;
    amount_approved: string;
    amount_received: string;
    date_approved: string;
    due_date: string;
    loan_witness_name: string;
    loan_witness_phone: string;
    loan_witness_relationship: string;
}
