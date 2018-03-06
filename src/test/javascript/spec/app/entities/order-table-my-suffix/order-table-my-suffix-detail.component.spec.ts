/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { App3TestModule } from '../../../test.module';
import { OrderTableMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/order-table-my-suffix/order-table-my-suffix-detail.component';
import { OrderTableMySuffixService } from '../../../../../../main/webapp/app/entities/order-table-my-suffix/order-table-my-suffix.service';
import { OrderTableMySuffix } from '../../../../../../main/webapp/app/entities/order-table-my-suffix/order-table-my-suffix.model';

describe('Component Tests', () => {

    describe('OrderTableMySuffix Management Detail Component', () => {
        let comp: OrderTableMySuffixDetailComponent;
        let fixture: ComponentFixture<OrderTableMySuffixDetailComponent>;
        let service: OrderTableMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [OrderTableMySuffixDetailComponent],
                providers: [
                    OrderTableMySuffixService
                ]
            })
            .overrideTemplate(OrderTableMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderTableMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderTableMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OrderTableMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderTable).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
