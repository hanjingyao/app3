import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TestRecordingMySuffix } from './test-recording-my-suffix.model';
import { TestRecordingMySuffixService } from './test-recording-my-suffix.service';

@Component({
    selector: 'jhi-test-recording-my-suffix-detail',
    templateUrl: './test-recording-my-suffix-detail.component.html'
})
export class TestRecordingMySuffixDetailComponent implements OnInit, OnDestroy {

    testRecording: TestRecordingMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private testRecordingService: TestRecordingMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTestRecordings();
    }

    load(id) {
        this.testRecordingService.find(id).subscribe((testRecording) => {
            this.testRecording = testRecording;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTestRecordings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'testRecordingListModification',
            (response) => this.load(this.testRecording.id)
        );
    }
}
