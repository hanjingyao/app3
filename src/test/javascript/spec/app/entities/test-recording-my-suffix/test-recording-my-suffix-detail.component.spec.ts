/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { App3TestModule } from '../../../test.module';
import { TestRecordingMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/test-recording-my-suffix/test-recording-my-suffix-detail.component';
import { TestRecordingMySuffixService } from '../../../../../../main/webapp/app/entities/test-recording-my-suffix/test-recording-my-suffix.service';
import { TestRecordingMySuffix } from '../../../../../../main/webapp/app/entities/test-recording-my-suffix/test-recording-my-suffix.model';

describe('Component Tests', () => {

    describe('TestRecordingMySuffix Management Detail Component', () => {
        let comp: TestRecordingMySuffixDetailComponent;
        let fixture: ComponentFixture<TestRecordingMySuffixDetailComponent>;
        let service: TestRecordingMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestRecordingMySuffixDetailComponent],
                providers: [
                    TestRecordingMySuffixService
                ]
            })
            .overrideTemplate(TestRecordingMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRecordingMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestRecordingMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TestRecordingMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.testRecording).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
