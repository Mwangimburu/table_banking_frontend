import { BaseModel } from '../../shared/models/base-model';

export class LoanApplicationModel extends BaseModel {
    status_id: string;
    witnessed_by_user_id: string;
 //   approved_by_user_id: string;

    reviewed_by_user_id: string;
    reviewed_on: string;
    status: string;
    approved_on: string;
    rejected_on: string;

    member_id: string;
    loan_officer_id: string;

    loan_type_id: string;
    interest_type_id: string;
    service_fee: string;

    penalty_type_id: string;
    penalty_value: string;
    penalty_frequency_id: string;
    reduce_principal_early: string;

    application_date: string;

    amount_applied: string;
    interest_rate: string;
    repayment_period: string;
    payment_frequency: string;
    periodic_payment_amount: string;

    interest_type: string;

    disburse_method_id: string;
    mpesa_number: string;
    bank_name: string;
    bank_branch: string;
    bank_account: string;
    other_banking_details: string;

    witness_type_id: string;
    witness_first_name: string;
    witness_last_name: string;
    witness_country: string;
    witness_county: string;
    witness_city: string;
    witness_national_id: string;
    witness_phone: string;
    witness_email: string;
    witness_postal_address: string;
    witness_residential_address: string;

    attach_application_form: string;

    guarantors: [];
    assets: [];
    member: {account_id};
    loanType: {};

    loan_application_form: File | null;
}
