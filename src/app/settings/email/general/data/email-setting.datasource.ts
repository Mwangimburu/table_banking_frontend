import { EmailSettingService } from './email-setting.service';
import { BaseDataSource } from '../../../../shared/base-data-source';

export class EmailSettingDatasource extends BaseDataSource {
    constructor(service: EmailSettingService) {
        super(service);
    }
}
