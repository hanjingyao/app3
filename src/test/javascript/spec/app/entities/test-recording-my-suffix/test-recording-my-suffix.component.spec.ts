/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { App3TestModule } from '../../../test.module';
import { TestRecordingMySuffixComponent } from '../../../../../../main/webapp/app/entities/test-recording-my-suffix/test-recording-my-suffix.component';
import { TestRecordingMySuffixService } from '../../../../../../main/webapp/app/entities/test-recording-my-suffix/test-recording-my-suffix.service';
import { TestRecordingMySuffix } from '../../../../../../main/webapp/app/entities/test-recording-my-suffix/test-recording-my-suffix.model';

describe('Component Tests', () => {

    describe('TestRecordingMySuffix Management Component', () => {
        let comp: TestRecordingMySuffixComponent;
        let fixture: ComponentFixture<TestRecordingMySuffixComponent>;
        let service: TestRecordingMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestRecordingMySuffixComponent],
                providers: [
                    TestRecordingMySuffixService
                ]
            })
            .overrideTemplate(TestRecordingMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRecordingMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestRecordingMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TestRecordingMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.testRecordings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
