/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { TestResultMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/test-result-my-suffix/test-result-my-suffix-delete-dialog.component';
import { TestResultMySuffixService } from '../../../../../../main/webapp/app/entities/test-result-my-suffix/test-result-my-suffix.service';

describe('Component Tests', () => {

    describe('TestResultMySuffix Management Delete Component', () => {
        let comp: TestResultMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TestResultMySuffixDeleteDialogComponent>;
        let service: TestResultMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestResultMySuffixDeleteDialogComponent],
                providers: [
                    TestResultMySuffixService
                ]
            })
            .overrideTemplate(TestResultMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestResultMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestResultMySuffixService);
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
