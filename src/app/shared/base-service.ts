import { BaseModel } from './models/base-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_URLS } from '../../assets/config/api-url';

export class BaseService<T extends BaseModel> {

    private readonly apiUrl: string;
    private readonly resourceUrl: string;

    constructor( private httpClient: HttpClient, private endpoint: string) {
        this.apiUrl = environment.production ?  API_URLS.prod : API_URLS.dev;

        // this.resourceUrl = `${this.apiUrl}/${this.endpoint}`;
       // this.resourceUrl = `http://localhost/19/dan/smartmicro/public/api/v1/` + this.endpoint;
        this.resourceUrl = this.apiUrl + `/` + this.endpoint;

        // Demo1
      //  this.resourceUrl = `http://africomit.co.ke/backend/api/v1/` + this.endpoint;

    }

    /**
     * API URL
     */
    protected getResourceUrl(): string {
        return this.resourceUrl;
    }

    /**
     * API item url
     * @param uuid
     */
    private getItemUrl(uuid: string): string {
        return `${this.resourceUrl}/${uuid}`;
    }

    private getUrl(uuid?: string) {
        if (uuid !== null) {
            return `${this.resourceUrl}/${uuid}`;
        }
        return this.resourceUrl;
    }

    /**
     *
     * @param fieldName
     */
    list(fieldName: any): Observable<{}> {
        return this.httpClient.get(this.getResourceUrl(), {
            params: new HttpParams()
                .set('list', fieldName)
        });
    }

    /**
     * Fetch resources from remote API
     * @param filter
     * @param page
     * @param limit
     * @param whereField
     * @param whereValue
     * @param sortField
     * @param sortDirection
     */
    getAll(filter: string, page: number, limit: number, sortField: string = '', sortDirection: string = '',
           whereField: string = '', whereValue: string = ''): Observable<{}> {
        return this.httpClient.get(this.getResourceUrl(), {
            params: new HttpParams()
                .set('filter', filter)
                .set('page', page.toString())
                .set('limit', limit.toString())
                .set('sortField', sortField)
                .set('sortDirection', sortDirection)
                .set('whereField', whereField)
                .set('whereValue', whereValue)
        });
    }

    fetchBranches(page = 0, limit = 4, sortField: string = '', sortDirection: string = ''): Observable<{}> {
        return this.httpClient.get(this.getResourceUrl(), {
            params: new HttpParams()
                .set('filter', '')
                .set('page', page.toString())
                .set('limit', limit.toString())
                .set('sortField', sortField)
                .set('sortDirection', sortDirection)
        });
    }

    /**
     * Fetch single item by specified id
     * @param uuid
     */
    getById(uuid: string): Observable<T> {
        return this.httpClient
            .get<T>(this.getItemUrl(uuid));
    }

    /**
     * Create a new resource
     * @param item
     */
    public create(item: T): Observable<T> {
        return this.httpClient.post<T>(this.getResourceUrl(), item);
    }

    /**
     * Update an existing resource
     * @param item
     */
    public update(item: T): Observable<T> {
        return this.httpClient.put<T>(this.getItemUrl(item.id), item);
    }

    /**
     * Remove a record from db
     * @param item
     */
    public delete(item: T) {
        return this.httpClient.delete(this.getItemUrl(item.id));
    }
}
