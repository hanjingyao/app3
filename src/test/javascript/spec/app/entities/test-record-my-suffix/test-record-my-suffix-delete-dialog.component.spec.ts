/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { TestRecordMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/test-record-my-suffix/test-record-my-suffix-delete-dialog.component';
import { TestRecordMySuffixService } from '../../../../../../main/webapp/app/entities/test-record-my-suffix/test-record-my-suffix.service';

describe('Component Tests', () => {

    describe('TestRecordMySuffix Management Delete Component', () => {
        let comp: TestRecordMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TestRecordMySuffixDeleteDialogComponent>;
        let service: TestRecordMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestRecordMySuffixDeleteDialogComponent],
                providers: [
                    TestRecordMySuffixService
                ]
            })
            .overrideTemplate(TestRecordMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRecordMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestRecordMySuffixService);
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
