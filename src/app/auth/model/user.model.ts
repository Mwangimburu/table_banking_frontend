import { GeneralSettingModel } from '../../settings/general/model/general-setting.model';

export interface User {
    access_token: string;
    expires_in: any;
    scope: [];
    settings: GeneralSettingModel;
}
