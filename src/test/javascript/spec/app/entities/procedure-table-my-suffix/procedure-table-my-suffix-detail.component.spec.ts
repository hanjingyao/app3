/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { App3TestModule } from '../../../test.module';
import { ProcedureTableMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix/procedure-table-my-suffix-detail.component';
import { ProcedureTableMySuffixService } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix/procedure-table-my-suffix.service';
import { ProcedureTableMySuffix } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix/procedure-table-my-suffix.model';

describe('Component Tests', () => {

    describe('ProcedureTableMySuffix Management Detail Component', () => {
        let comp: ProcedureTableMySuffixDetailComponent;
        let fixture: ComponentFixture<ProcedureTableMySuffixDetailComponent>;
        let service: ProcedureTableMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [ProcedureTableMySuffixDetailComponent],
                providers: [
                    ProcedureTableMySuffixService
                ]
            })
            .overrideTemplate(ProcedureTableMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProcedureTableMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProcedureTableMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ProcedureTableMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.procedureTable).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
