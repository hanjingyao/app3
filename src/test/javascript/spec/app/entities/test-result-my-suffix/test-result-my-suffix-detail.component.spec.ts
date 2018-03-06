/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { App3TestModule } from '../../../test.module';
import { TestResultMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/test-result-my-suffix/test-result-my-suffix-detail.component';
import { TestResultMySuffixService } from '../../../../../../main/webapp/app/entities/test-result-my-suffix/test-result-my-suffix.service';
import { TestResultMySuffix } from '../../../../../../main/webapp/app/entities/test-result-my-suffix/test-result-my-suffix.model';

describe('Component Tests', () => {

    describe('TestResultMySuffix Management Detail Component', () => {
        let comp: TestResultMySuffixDetailComponent;
        let fixture: ComponentFixture<TestResultMySuffixDetailComponent>;
        let service: TestResultMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestResultMySuffixDetailComponent],
                providers: [
                    TestResultMySuffixService
                ]
            })
            .overrideTemplate(TestResultMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestResultMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestResultMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TestResultMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.testResult).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
