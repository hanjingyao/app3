import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TestRecordingMySuffix } from './test-recording-my-suffix.model';
import { TestRecordingMySuffixService } from './test-recording-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-test-recording-my-suffix',
    templateUrl: './test-recording-my-suffix.component.html'
})
export class TestRecordingMySuffixComponent implements OnInit, OnDestroy {
testRecordings: TestRecordingMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private testRecordingService: TestRecordingMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.testRecordingService.query().subscribe(
            (res: ResponseWrapper) => {
                this.testRecordings = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTestRecordings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TestRecordingMySuffix) {
        return item.id;
    }
    registerChangeInTestRecordings() {
        this.eventSubscriber = this.eventManager.subscribe('testRecordingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
