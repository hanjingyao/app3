import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EquipmentMySuffix } from './equipment-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EquipmentMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/equipment';

    constructor(private http: Http) { }

    create(equipment: EquipmentMySuffix): Observable<EquipmentMySuffix> {
        const copy = this.convert(equipment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(equipment: EquipmentMySuffix): Observable<EquipmentMySuffix> {
        const copy = this.convert(equipment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EquipmentMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to EquipmentMySuffix.
     */
    private convertItemFromServer(json: any): EquipmentMySuffix {
        const entity: EquipmentMySuffix = Object.assign(new EquipmentMySuffix(), json);
        return entity;
    }

    /**
     * Convert a EquipmentMySuffix to a JSON which can be sent to the server.
     */
    private convert(equipment: EquipmentMySuffix): EquipmentMySuffix {
        const copy: EquipmentMySuffix = Object.assign({}, equipment);
        return copy;
    }
}
