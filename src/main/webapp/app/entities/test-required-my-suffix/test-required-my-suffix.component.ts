import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TestRequiredMySuffix } from './test-required-my-suffix.model';
import { TestRequiredMySuffixService } from './test-required-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-test-required-my-suffix',
    templateUrl: './test-required-my-suffix.component.html'
})
export class TestRequiredMySuffixComponent implements OnInit, OnDestroy {
testRequireds: TestRequiredMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private testRequiredService: TestRequiredMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.testRequiredService.query().subscribe(
            (res: ResponseWrapper) => {
                this.testRequireds = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTestRequireds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TestRequiredMySuffix) {
        return item.id;
    }
    registerChangeInTestRequireds() {
        this.eventSubscriber = this.eventManager.subscribe('testRequiredListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
