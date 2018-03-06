/* tslint:disable max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend, RequestOptions, BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { JhiDateUtils } from 'ng-jhipster';

import { EquipmentMySuffixService } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix.service';
import { EquipmentMySuffix } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix.model';
import { SERVER_API_URL } from '../../../../../../main/webapp/app/app.constants';

describe('Service Tests', () => {

    describe('EquipmentMySuffix Service', () => {
        let service: EquipmentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                providers: [
                    {
                        provide: ConnectionBackend,
                        useClass: MockBackend
                    },
                    {
                        provide: RequestOptions,
                        useClass: BaseRequestOptions
                    },
                    Http,
                    JhiDateUtils,
                    EquipmentMySuffixService
                ]
            });

            service = TestBed.get(EquipmentMySuffixService);

            this.backend = TestBed.get(ConnectionBackend) as MockBackend;
            this.backend.connections.subscribe((connection: any) => {
                this.lastConnection = connection;
            });
        }));

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find(123).subscribe(() => {});

                expect(this.lastConnection).toBeDefined();

                const resourceUrl = SERVER_API_URL + 'api/equipment';
                expect(this.lastConnection.request.url).toEqual(resourceUrl + '/' + 123);
            });
            it('should return EquipmentMySuffix', () => {

                let entity: EquipmentMySuffix;
                service.find(123).subscribe((_entity: EquipmentMySuffix) => {
                    entity = _entity;
                });

                this.lastConnection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify({id: 123}),
                })));

                expect(entity).toBeDefined();
                expect(entity.id).toEqual(123);
            });

            it('should propagate not found response', () => {

                let error: any;
                service.find(123).subscribe(null, (_error: any) => {
                    error = _error;
                });

                this.lastConnection.mockError(new Response(new ResponseOptions({
                    status: 404,
                })));

                expect(error).toBeDefined();
                expect(error.status).toEqual(404);
            });
        });
    });

});
