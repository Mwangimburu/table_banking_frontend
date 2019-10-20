import { BaseModel } from '../../shared/models/base-model';

export class ReportModel extends BaseModel {
    branch_id: string;
    start_date: string;
    end_date: string;
    report_type_id: string;
}
