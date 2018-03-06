/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { EquipmentMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix-dialog.component';
import { EquipmentMySuffixService } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix.service';
import { EquipmentMySuffix } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix.model';
import { OrderTableMySuffixService } from '../../../../../../main/webapp/app/entities/order-table-my-suffix';

describe('Component Tests', () => {

    describe('EquipmentMySuffix Management Dialog Component', () => {
        let comp: EquipmentMySuffixDialogComponent;
        let fixture: ComponentFixture<EquipmentMySuffixDialogComponent>;
        let service: EquipmentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [EquipmentMySuffixDialogComponent],
                providers: [
                    OrderTableMySuffixService,
                    EquipmentMySuffixService
                ]
            })
            .overrideTemplate(EquipmentMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EquipmentMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipmentMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EquipmentMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.equipment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'equipmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EquipmentMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.equipment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'equipmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
