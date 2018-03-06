/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { App3TestModule } from '../../../test.module';
import { TestRequiredMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/test-required-my-suffix/test-required-my-suffix-detail.component';
import { TestRequiredMySuffixService } from '../../../../../../main/webapp/app/entities/test-required-my-suffix/test-required-my-suffix.service';
import { TestRequiredMySuffix } from '../../../../../../main/webapp/app/entities/test-required-my-suffix/test-required-my-suffix.model';

describe('Component Tests', () => {

    describe('TestRequiredMySuffix Management Detail Component', () => {
        let comp: TestRequiredMySuffixDetailComponent;
        let fixture: ComponentFixture<TestRequiredMySuffixDetailComponent>;
        let service: TestRequiredMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App3TestModule],
                declarations: [TestRequiredMySuffixDetailComponent],
                providers: [
                    TestRequiredMySuffixService
                ]
            })
            .overrideTemplate(TestRequiredMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestRequiredMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestRequiredMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TestRequiredMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.testRequired).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
