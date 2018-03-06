import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TestRecordMySuffix } from './test-record-my-suffix.model';
import { TestRecordMySuffixPopupService } from './test-record-my-suffix-popup.service';
import { TestRecordMySuffixService } from './test-record-my-suffix.service';

@Component({
    selector: 'jhi-test-record-my-suffix-dialog',
    templateUrl: './test-record-my-suffix-dialog.component.html'
})
export class TestRecordMySuffixDialogComponent implements OnInit {

    testRecord: TestRecordMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private testRecordService: TestRecordMySuffixService,
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
        if (this.testRecord.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testRecordService.update(this.testRecord));
        } else {
            this.subscribeToSaveResponse(
                this.testRecordService.create(this.testRecord));
        }
    }

    private subscribeToSaveResponse(result: Observable<TestRecordMySuffix>) {
        result.subscribe((res: TestRecordMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TestRecordMySuffix) {
        this.eventManager.broadcast({ name: 'testRecordListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-test-record-my-suffix-popup',
    template: ''
})
export class TestRecordMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testRecordPopupService: TestRecordMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.testRecordPopupService
                    .open(TestRecordMySuffixDialogComponent as Component, params['id']);
            } else {
                this.testRecordPopupService
                    .open(TestRecordMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
