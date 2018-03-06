/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { App3TestModule } from '../../../test.module';
import { TestRequiredMySuffixComponent } from '../../../../../../main/webapp/app/entities/test-required-my-suffix/test-required-my-suffix.component';
import { TestRequiredMySuffixService } from '../../../../../../main/webapp/app/entities/test-required-my-suffix/test-required-my-suffix.service';
import { TestRequiredMySuffix } from '../../../../../../main/webapp/app/entities/test-required-my-suffix/test-required-my-suffix.model';

describe('Component Tests', () => {

    describe('TestRequiredMySuffix Management Component', () => {
        let comp: TestRequiredMySuffixComponent;
        let fixture: ComponentFixture<TestRequiredMySuffixComponent>;
        let service: TestRequiredMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestRequiredMySuffixComponent],
                providers: [
                    TestRequiredMySuffixService
                ]
            })
            .overrideTemplate(TestRequiredMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRequiredMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestRequiredMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TestRequiredMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.testRequireds[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
