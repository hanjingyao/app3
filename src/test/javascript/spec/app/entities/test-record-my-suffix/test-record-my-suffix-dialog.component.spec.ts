/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { TestRecordMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/test-record-my-suffix/test-record-my-suffix-dialog.component';
import { TestRecordMySuffixService } from '../../../../../../main/webapp/app/entities/test-record-my-suffix/test-record-my-suffix.service';
import { TestRecordMySuffix } from '../../../../../../main/webapp/app/entities/test-record-my-suffix/test-record-my-suffix.model';

describe('Component Tests', () => {

    describe('TestRecordMySuffix Management Dialog Component', () => {
        let comp: TestRecordMySuffixDialogComponent;
        let fixture: ComponentFixture<TestRecordMySuffixDialogComponent>;
        let service: TestRecordMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestRecordMySuffixDialogComponent],
                providers: [
                    TestRecordMySuffixService
                ]
            })
            .overrideTemplate(TestRecordMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRecordMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestRecordMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TestRecordMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.testRecord = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'testRecordListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TestRecordMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.testRecord = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'testRecordListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
