/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { TestResultMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/test-result-my-suffix/test-result-my-suffix-dialog.component';
import { TestResultMySuffixService } from '../../../../../../main/webapp/app/entities/test-result-my-suffix/test-result-my-suffix.service';
import { TestResultMySuffix } from '../../../../../../main/webapp/app/entities/test-result-my-suffix/test-result-my-suffix.model';

describe('Component Tests', () => {

    describe('TestResultMySuffix Management Dialog Component', () => {
        let comp: TestResultMySuffixDialogComponent;
        let fixture: ComponentFixture<TestResultMySuffixDialogComponent>;
        let service: TestResultMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestResultMySuffixDialogComponent],
                providers: [
                    TestResultMySuffixService
                ]
            })
            .overrideTemplate(TestResultMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestResultMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestResultMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TestResultMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.testResult = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'testResultListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TestResultMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.testResult = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'testResultListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
