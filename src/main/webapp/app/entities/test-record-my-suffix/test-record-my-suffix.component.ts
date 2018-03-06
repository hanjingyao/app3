import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TestRecordMySuffix } from './test-record-my-suffix.model';
import { TestRecordMySuffixService } from './test-record-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-test-record-my-suffix',
    templateUrl: './test-record-my-suffix.component.html'
})
export class TestRecordMySuffixComponent implements OnInit, OnDestroy {
testRecords: TestRecordMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private testRecordService: TestRecordMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.testRecordService.query().subscribe(
            (res: ResponseWrapper) => {
                this.testRecords = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTestRecords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TestRecordMySuffix) {
        return item.id;
    }
    registerChangeInTestRecords() {
        this.eventSubscriber = this.eventManager.subscribe('testRecordListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
