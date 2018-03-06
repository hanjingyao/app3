import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProcedureTableMySuffix } from './procedure-table-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProcedureTableMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/procedure-tables';

    constructor(private http: Http) { }

    create(procedureTable: ProcedureTableMySuffix): Observable<ProcedureTableMySuffix> {
        const copy = this.convert(procedureTable);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(procedureTable: ProcedureTableMySuffix): Observable<ProcedureTableMySuffix> {
        const copy = this.convert(procedureTable);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ProcedureTableMySuffix> {
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
     * Convert a returned JSON object to ProcedureTableMySuffix.
     */
    private convertItemFromServer(json: any): ProcedureTableMySuffix {
        const entity: ProcedureTableMySuffix = Object.assign(new ProcedureTableMySuffix(), json);
        return entity;
    }

    /**
     * Convert a ProcedureTableMySuffix to a JSON which can be sent to the server.
     */
    private convert(procedureTable: ProcedureTableMySuffix): ProcedureTableMySuffix {
        const copy: ProcedureTableMySuffix = Object.assign({}, procedureTable);
        return copy;
    }
}
