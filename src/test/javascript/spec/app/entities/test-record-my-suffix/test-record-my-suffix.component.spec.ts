/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { App3TestModule } from '../../../test.module';
import { TestRecordMySuffixComponent } from '../../../../../../main/webapp/app/entities/test-record-my-suffix/test-record-my-suffix.component';
import { TestRecordMySuffixService } from '../../../../../../main/webapp/app/entities/test-record-my-suffix/test-record-my-suffix.service';
import { TestRecordMySuffix } from '../../../../../../main/webapp/app/entities/test-record-my-suffix/test-record-my-suffix.model';

describe('Component Tests', () => {

    describe('TestRecordMySuffix Management Component', () => {
        let comp: TestRecordMySuffixComponent;
        let fixture: ComponentFixture<TestRecordMySuffixComponent>;
        let service: TestRecordMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestRecordMySuffixComponent],
                providers: [
                    TestRecordMySuffixService
                ]
            })
            .overrideTemplate(TestRecordMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRecordMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestRecordMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TestRecordMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.testRecords[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
