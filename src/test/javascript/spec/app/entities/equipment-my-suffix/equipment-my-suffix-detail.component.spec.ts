/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { App3TestModule } from '../../../test.module';
import { EquipmentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix-detail.component';
import { EquipmentMySuffixService } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix.service';
import { EquipmentMySuffix } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix.model';

describe('Component Tests', () => {

    describe('EquipmentMySuffix Management Detail Component', () => {
        let comp: EquipmentMySuffixDetailComponent;
        let fixture: ComponentFixture<EquipmentMySuffixDetailComponent>;
        let service: EquipmentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [EquipmentMySuffixDetailComponent],
                providers: [
                    EquipmentMySuffixService
                ]
            })
            .overrideTemplate(EquipmentMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EquipmentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipmentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EquipmentMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.equipment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
