/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { OrderTableMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/order-table-my-suffix/order-table-my-suffix-delete-dialog.component';
import { OrderTableMySuffixService } from '../../../../../../main/webapp/app/entities/order-table-my-suffix/order-table-my-suffix.service';

describe('Component Tests', () => {

    describe('OrderTableMySuffix Management Delete Component', () => {
        let comp: OrderTableMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<OrderTableMySuffixDeleteDialogComponent>;
        let service: OrderTableMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [OrderTableMySuffixDeleteDialogComponent],
                providers: [
                    OrderTableMySuffixService
                ]
            })
            .overrideTemplate(OrderTableMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderTableMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderTableMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
