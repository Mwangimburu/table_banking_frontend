import { Injectable } from '@angular/core'
import { HttpClient, HttpBackend } from '@angular/common/http';
import { IAppConfig } from './models/app-config.model';
import { environment } from '../../environments/environment';

@Injectable()
export class AppConfigService {

    static settings: IAppConfig;

    private http: HttpClient;

    constructor(handler: HttpBackend) {
        this.http = new HttpClient(handler);
    }

    /**
     * Load configuration data into this service
     */
    load() {
        let jsonFile: string;

        if (environment.production) {
            jsonFile = `assets/config/config.prod.json`;
        } else {
            jsonFile = `assets/config/config.dev.json`;
        }
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: IAppConfig) => {
                AppConfigService.settings = <IAppConfig>response;
                resolve();
            }).catch((response: any) => {
                reject(`Error: Config file fail: '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
