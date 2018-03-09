/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { TestRecordingMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/test-recording-my-suffix/test-recording-my-suffix-delete-dialog.component';
import { TestRecordingMySuffixService } from '../../../../../../main/webapp/app/entities/test-recording-my-suffix/test-recording-my-suffix.service';

describe('Component Tests', () => {

    describe('TestRecordingMySuffix Management Delete Component', () => {
        let comp: TestRecordingMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TestRecordingMySuffixDeleteDialogComponent>;
        let service: TestRecordingMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestRecordingMySuffixDeleteDialogComponent],
                providers: [
                    TestRecordingMySuffixService
                ]
            })
            .overrideTemplate(TestRecordingMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRecordingMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestRecordingMySuffixService);
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
