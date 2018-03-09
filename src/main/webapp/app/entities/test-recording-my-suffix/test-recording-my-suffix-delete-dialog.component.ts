import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TestRecordingMySuffix } from './test-recording-my-suffix.model';
import { TestRecordingMySuffixPopupService } from './test-recording-my-suffix-popup.service';
import { TestRecordingMySuffixService } from './test-recording-my-suffix.service';

@Component({
    selector: 'jhi-test-recording-my-suffix-delete-dialog',
    templateUrl: './test-recording-my-suffix-delete-dialog.component.html'
})
export class TestRecordingMySuffixDeleteDialogComponent {

    testRecording: TestRecordingMySuffix;

    constructor(
        private testRecordingService: TestRecordingMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testRecordingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'testRecordingListModification',
                content: 'Deleted an testRecording'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-recording-my-suffix-delete-popup',
    template: ''
})
export class TestRecordingMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testRecordingPopupService: TestRecordingMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.testRecordingPopupService
                .open(TestRecordingMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
