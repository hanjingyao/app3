/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { ProcedureTableMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix/procedure-table-my-suffix-delete-dialog.component';
import { ProcedureTableMySuffixService } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix/procedure-table-my-suffix.service';

describe('Component Tests', () => {

    describe('ProcedureTableMySuffix Management Delete Component', () => {
        let comp: ProcedureTableMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ProcedureTableMySuffixDeleteDialogComponent>;
        let service: ProcedureTableMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [ProcedureTableMySuffixDeleteDialogComponent],
                providers: [
                    ProcedureTableMySuffixService
                ]
            })
            .overrideTemplate(ProcedureTableMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProcedureTableMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProcedureTableMySuffixService);
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
