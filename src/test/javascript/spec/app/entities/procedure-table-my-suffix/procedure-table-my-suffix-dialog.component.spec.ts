/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { ProcedureTableMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix/procedure-table-my-suffix-dialog.component';
import { ProcedureTableMySuffixService } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix/procedure-table-my-suffix.service';
import { ProcedureTableMySuffix } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix/procedure-table-my-suffix.model';
import { OrderTableMySuffixService } from '../../../../../../main/webapp/app/entities/order-table-my-suffix';

describe('Component Tests', () => {

    describe('ProcedureTableMySuffix Management Dialog Component', () => {
        let comp: ProcedureTableMySuffixDialogComponent;
        let fixture: ComponentFixture<ProcedureTableMySuffixDialogComponent>;
        let service: ProcedureTableMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [ProcedureTableMySuffixDialogComponent],
                providers: [
                    OrderTableMySuffixService,
                    ProcedureTableMySuffixService
                ]
            })
            .overrideTemplate(ProcedureTableMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProcedureTableMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProcedureTableMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProcedureTableMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.procedureTable = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'procedureTableListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProcedureTableMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.procedureTable = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'procedureTableListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
