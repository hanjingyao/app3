import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TestRequiredMySuffix } from './test-required-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TestRequiredMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/test-requireds';

    constructor(private http: Http) { }

    create(testRequired: TestRequiredMySuffix): Observable<TestRequiredMySuffix> {
        const copy = this.convert(testRequired);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(testRequired: TestRequiredMySuffix): Observable<TestRequiredMySuffix> {
        const copy = this.convert(testRequired);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TestRequiredMySuffix> {
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
     * Convert a returned JSON object to TestRequiredMySuffix.
     */
    private convertItemFromServer(json: any): TestRequiredMySuffix {
        const entity: TestRequiredMySuffix = Object.assign(new TestRequiredMySuffix(), json);
        return entity;
    }

    /**
     * Convert a TestRequiredMySuffix to a JSON which can be sent to the server.
     */
    private convert(testRequired: TestRequiredMySuffix): TestRequiredMySuffix {
        const copy: TestRequiredMySuffix = Object.assign({}, testRequired);
        return copy;
    }
}
