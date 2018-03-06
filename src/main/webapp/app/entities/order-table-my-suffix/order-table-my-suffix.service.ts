import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderTableMySuffix } from './order-table-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OrderTableMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/order-tables';

    constructor(private http: Http) { }

    create(orderTable: OrderTableMySuffix): Observable<OrderTableMySuffix> {
        const copy = this.convert(orderTable);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(orderTable: OrderTableMySuffix): Observable<OrderTableMySuffix> {
        const copy = this.convert(orderTable);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OrderTableMySuffix> {
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
     * Convert a returned JSON object to OrderTableMySuffix.
     */
    private convertItemFromServer(json: any): OrderTableMySuffix {
        const entity: OrderTableMySuffix = Object.assign(new OrderTableMySuffix(), json);
        return entity;
    }

    /**
     * Convert a OrderTableMySuffix to a JSON which can be sent to the server.
     */
    private convert(orderTable: OrderTableMySuffix): OrderTableMySuffix {
        const copy: OrderTableMySuffix = Object.assign({}, orderTable);
        return copy;
    }
}
