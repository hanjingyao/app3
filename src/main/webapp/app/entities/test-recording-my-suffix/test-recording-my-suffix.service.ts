import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TestRecordingMySuffix } from './test-recording-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TestRecordingMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/test-recordings';

    constructor(private http: Http) { }

    create(testRecording: TestRecordingMySuffix): Observable<TestRecordingMySuffix> {
        const copy = this.convert(testRecording);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(testRecording: TestRecordingMySuffix): Observable<TestRecordingMySuffix> {
        const copy = this.convert(testRecording);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TestRecordingMySuffix> {
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
     * Convert a returned JSON object to TestRecordingMySuffix.
     */
    private convertItemFromServer(json: any): TestRecordingMySuffix {
        const entity: TestRecordingMySuffix = Object.assign(new TestRecordingMySuffix(), json);
        return entity;
    }

    /**
     * Convert a TestRecordingMySuffix to a JSON which can be sent to the server.
     */
    private convert(testRecording: TestRecordingMySuffix): TestRecordingMySuffix {
        const copy: TestRecordingMySuffix = Object.assign({}, testRecording);
        return copy;
    }
}
