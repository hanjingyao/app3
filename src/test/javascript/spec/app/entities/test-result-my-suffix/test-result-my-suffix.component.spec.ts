/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { App3TestModule } from '../../../test.module';
import { TestResultMySuffixComponent } from '../../../../../../main/webapp/app/entities/test-result-my-suffix/test-result-my-suffix.component';
import { TestResultMySuffixService } from '../../../../../../main/webapp/app/entities/test-result-my-suffix/test-result-my-suffix.service';
import { TestResultMySuffix } from '../../../../../../main/webapp/app/entities/test-result-my-suffix/test-result-my-suffix.model';

describe('Component Tests', () => {

    describe('TestResultMySuffix Management Component', () => {
        let comp: TestResultMySuffixComponent;
        let fixture: ComponentFixture<TestResultMySuffixComponent>;
        let service: TestResultMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestResultMySuffixComponent],
                providers: [
                    TestResultMySuffixService
                ]
            })
            .overrideTemplate(TestResultMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestResultMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestResultMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TestResultMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.testResults[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
