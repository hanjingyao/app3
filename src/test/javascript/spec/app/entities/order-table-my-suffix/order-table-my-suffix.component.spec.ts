/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { App3TestModule } from '../../../test.module';
import { OrderTableMySuffixComponent } from '../../../../../../main/webapp/app/entities/order-table-my-suffix/order-table-my-suffix.component';
import { OrderTableMySuffixService } from '../../../../../../main/webapp/app/entities/order-table-my-suffix/order-table-my-suffix.service';
import { OrderTableMySuffix } from '../../../../../../main/webapp/app/entities/order-table-my-suffix/order-table-my-suffix.model';

describe('Component Tests', () => {

    describe('OrderTableMySuffix Management Component', () => {
        let comp: OrderTableMySuffixComponent;
        let fixture: ComponentFixture<OrderTableMySuffixComponent>;
        let service: OrderTableMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [OrderTableMySuffixComponent],
                providers: [
                    OrderTableMySuffixService
                ]
            })
            .overrideTemplate(OrderTableMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderTableMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderTableMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new OrderTableMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderTables[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
