/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { App3TestModule } from '../../../test.module';
import { TestRecordMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/test-record-my-suffix/test-record-my-suffix-detail.component';
import { TestRecordMySuffixService } from '../../../../../../main/webapp/app/entities/test-record-my-suffix/test-record-my-suffix.service';
import { TestRecordMySuffix } from '../../../../../../main/webapp/app/entities/test-record-my-suffix/test-record-my-suffix.model';

describe('Component Tests', () => {

    describe('TestRecordMySuffix Management Detail Component', () => {
        let comp: TestRecordMySuffixDetailComponent;
        let fixture: ComponentFixture<TestRecordMySuffixDetailComponent>;
        let service: TestRecordMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestRecordMySuffixDetailComponent],
                providers: [
                    TestRecordMySuffixService
                ]
            })
            .overrideTemplate(TestRecordMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRecordMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestRecordMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TestRecordMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.testRecord).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
