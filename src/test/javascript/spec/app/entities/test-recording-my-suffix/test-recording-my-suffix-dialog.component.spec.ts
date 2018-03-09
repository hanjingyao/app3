/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { TestRecordingMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/test-recording-my-suffix/test-recording-my-suffix-dialog.component';
import { TestRecordingMySuffixService } from '../../../../../../main/webapp/app/entities/test-recording-my-suffix/test-recording-my-suffix.service';
import { TestRecordingMySuffix } from '../../../../../../main/webapp/app/entities/test-recording-my-suffix/test-recording-my-suffix.model';

describe('Component Tests', () => {

    describe('TestRecordingMySuffix Management Dialog Component', () => {
        let comp: TestRecordingMySuffixDialogComponent;
        let fixture: ComponentFixture<TestRecordingMySuffixDialogComponent>;
        let service: TestRecordingMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestRecordingMySuffixDialogComponent],
                providers: [
                    TestRecordingMySuffixService
                ]
            })
            .overrideTemplate(TestRecordingMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRecordingMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestRecordingMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TestRecordingMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.testRecording = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'testRecordingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TestRecordingMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.testRecording = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'testRecordingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
