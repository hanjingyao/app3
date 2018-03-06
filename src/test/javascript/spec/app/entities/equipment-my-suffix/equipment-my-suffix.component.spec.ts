/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { App3TestModule } from '../../../test.module';
import { EquipmentMySuffixComponent } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix.component';
import { EquipmentMySuffixService } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix.service';
import { EquipmentMySuffix } from '../../../../../../main/webapp/app/entities/equipment-my-suffix/equipment-my-suffix.model';

describe('Component Tests', () => {

    describe('EquipmentMySuffix Management Component', () => {
        let comp: EquipmentMySuffixComponent;
        let fixture: ComponentFixture<EquipmentMySuffixComponent>;
        let service: EquipmentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [EquipmentMySuffixComponent],
                providers: [
                    EquipmentMySuffixService
                ]
            })
            .overrideTemplate(EquipmentMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EquipmentMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipmentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EquipmentMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.equipment[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
