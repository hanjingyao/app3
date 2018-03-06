import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TestResultMySuffix } from './test-result-my-suffix.model';
import { TestResultMySuffixService } from './test-result-my-suffix.service';

@Component({
    selector: 'jhi-test-result-my-suffix-detail',
    templateUrl: './test-result-my-suffix-detail.component.html'
})
export class TestResultMySuffixDetailComponent implements OnInit, OnDestroy {

    testResult: TestResultMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private testResultService: TestResultMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTestResults();
    }

    load(id) {
        this.testResultService.find(id).subscribe((testResult) => {
            this.testResult = testResult;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTestResults() {
        this.eventSubscriber = this.eventManager.subscribe(
            'testResultListModification',
            (response) => this.load(this.testResult.id)
        );
    }
}
