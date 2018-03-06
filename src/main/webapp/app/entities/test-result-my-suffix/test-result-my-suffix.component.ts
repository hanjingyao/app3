import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TestResultMySuffix } from './test-result-my-suffix.model';
import { TestResultMySuffixService } from './test-result-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-test-result-my-suffix',
    templateUrl: './test-result-my-suffix.component.html'
})
export class TestResultMySuffixComponent implements OnInit, OnDestroy {
testResults: TestResultMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private testResultService: TestResultMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.testResultService.query().subscribe(
            (res: ResponseWrapper) => {
                this.testResults = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTestResults();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TestResultMySuffix) {
        return item.id;
    }
    registerChangeInTestResults() {
        this.eventSubscriber = this.eventManager.subscribe('testResultListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
