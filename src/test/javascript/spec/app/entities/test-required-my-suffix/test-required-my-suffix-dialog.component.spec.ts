/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { TestRequiredMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/test-required-my-suffix/test-required-my-suffix-dialog.component';
import { TestRequiredMySuffixService } from '../../../../../../main/webapp/app/entities/test-required-my-suffix/test-required-my-suffix.service';
import { TestRequiredMySuffix } from '../../../../../../main/webapp/app/entities/test-required-my-suffix/test-required-my-suffix.model';
import { TestResultMySuffixService } from '../../../../../../main/webapp/app/entities/test-result-my-suffix';
import { TestRecordMySuffixService } from '../../../../../../main/webapp/app/entities/test-record-my-suffix';
import { ProcedureTableMySuffixService } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix';

describe('Component Tests', () => {

    describe('TestRequiredMySuffix Management Dialog Component', () => {
        let comp: TestRequiredMySuffixDialogComponent;
        let fixture: ComponentFixture<TestRequiredMySuffixDialogComponent>;
        let service: TestRequiredMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestRequiredMySuffixDialogComponent],
                providers: [
                    TestResultMySuffixService,
                    TestRecordMySuffixService,
                    ProcedureTableMySuffixService,
                    TestRequiredMySuffixService
                ]
            })
            .overrideTemplate(TestRequiredMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRequiredMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestRequiredMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TestRequiredMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.testRequired = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'testRequiredListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TestRequiredMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.testRequired = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'testRequiredListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
