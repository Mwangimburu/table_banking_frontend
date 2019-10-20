import { ReportService } from './report.service';
import { BaseDataSource } from '../../shared/base-data-source';

export class ReportDataSource extends BaseDataSource {
    constructor(service: ReportService) {
        super(service);
    }
}
