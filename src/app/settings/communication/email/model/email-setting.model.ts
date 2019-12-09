import { BaseModel } from '../../../../shared/models/base-model';

export class EmailSettingModel extends BaseModel {
    protocol: string;
    smpt_host: string;
    smpt_username: string;
    smpt_password: string;
    smpt_port: string;
    mail_gun_domain: string;
    mandrill_secret: string;
    from_name: string;
    from_email: string;
}
