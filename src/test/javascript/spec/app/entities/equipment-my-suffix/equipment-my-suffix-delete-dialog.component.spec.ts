/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { App3TestModule } from '../../../test.module';
import { EquipmentMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix-delete-dialog.component';
import { EquipmentMySuffixService } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix.service';

describe('Component Tests', () => {

    describe('EquipmentMySuffix Management Delete Component', () => {
        let comp: EquipmentMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EquipmentMySuffixDeleteDialogComponent>;
        let service: EquipmentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [EquipmentMySuffixDeleteDialogComponent],
                providers: [
                    EquipmentMySuffixService
                ]
            })
            .overrideTemplate(EquipmentMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EquipmentMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipmentMySuffixService);
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
