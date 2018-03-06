import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TestRecordMySuffix } from './test-record-my-suffix.model';
import { TestRecordMySuffixService } from './test-record-my-suffix.service';

@Component({
    selector: 'jhi-test-record-my-suffix-detail',
    templateUrl: './test-record-my-suffix-detail.component.html'
})
export class TestRecordMySuffixDetailComponent implements OnInit, OnDestroy {

    testRecord: TestRecordMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private testRecordService: TestRecordMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTestRecords();
    }

    load(id) {
        this.testRecordService.find(id).subscribe((testRecord) => {
            this.testRecord = testRecord;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTestRecords() {
        this.eventSubscriber = this.eventManager.subscribe(
            'testRecordListModification',
            (response) => this.load(this.testRecord.id)
        );
    }
}
