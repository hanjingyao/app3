/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { App3TestModule } from '../../../test.module';
import { ProcedureTableMySuffixComponent } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix/procedure-table-my-suffix.component';
import { ProcedureTableMySuffixService } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix/procedure-table-my-suffix.service';
import { ProcedureTableMySuffix } from '../../../../../../main/webapp/app/entities/procedure-table-my-suffix/procedure-table-my-suffix.model';

describe('Component Tests', () => {

    describe('ProcedureTableMySuffix Management Component', () => {
        let comp: ProcedureTableMySuffixComponent;
        let fixture: ComponentFixture<ProcedureTableMySuffixComponent>;
        let service: ProcedureTableMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [ProcedureTableMySuffixComponent],
                providers: [
                    ProcedureTableMySuffixService
                ]
            })
            .overrideTemplate(ProcedureTableMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProcedureTableMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProcedureTableMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ProcedureTableMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.procedureTables[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
