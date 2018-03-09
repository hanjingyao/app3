import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TestRecordingMySuffix } from './test-recording-my-suffix.model';
import { TestRecordingMySuffixPopupService } from './test-recording-my-suffix-popup.service';
import { TestRecordingMySuffixService } from './test-recording-my-suffix.service';

@Component({
    selector: 'jhi-test-recording-my-suffix-dialog',
    templateUrl: './test-recording-my-suffix-dialog.component.html'
})
export class TestRecordingMySuffixDialogComponent implements OnInit {

    testRecording: TestRecordingMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private testRecordingService: TestRecordingMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.testRecording.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testRecordingService.update(this.testRecording));
        } else {
            this.subscribeToSaveResponse(
                this.testRecordingService.create(this.testRecording));
        }
    }

    private subscribeToSaveResponse(result: Observable<TestRecordingMySuffix>) {
        result.subscribe((res: TestRecordingMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TestRecordingMySuffix) {
        this.eventManager.broadcast({ name: 'testRecordingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-test-recording-my-suffix-popup',
    template: ''
})
export class TestRecordingMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testRecordingPopupService: TestRecordingMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.testRecordingPopupService
                    .open(TestRecordingMySuffixDialogComponent as Component, params['id']);
            } else {
                this.testRecordingPopupService
                    .open(TestRecordingMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
