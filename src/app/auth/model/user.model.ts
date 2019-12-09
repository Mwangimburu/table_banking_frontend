import { GeneralSettingModel } from '../../settings/general/model/general-setting.model';

export interface User {
    first_name: string;
    middle_name: any;
    last_name: string;
    access_token: string;
    expires_in: any;
    scope: [];
    settings: GeneralSettingModel;
}
