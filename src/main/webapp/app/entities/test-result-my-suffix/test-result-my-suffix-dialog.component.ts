import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TestResultMySuffix } from './test-result-my-suffix.model';
import { TestResultMySuffixPopupService } from './test-result-my-suffix-popup.service';
import { TestResultMySuffixService } from './test-result-my-suffix.service';

@Component({
    selector: 'jhi-test-result-my-suffix-dialog',
    templateUrl: './test-result-my-suffix-dialog.component.html'
})
export class TestResultMySuffixDialogComponent implements OnInit {

    testResult: TestResultMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private testResultService: TestResultMySuffixService,
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
        if (this.testResult.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testResultService.update(this.testResult));
        } else {
            this.subscribeToSaveResponse(
                this.testResultService.create(this.testResult));
        }
    }

    private subscribeToSaveResponse(result: Observable<TestResultMySuffix>) {
        result.subscribe((res: TestResultMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TestResultMySuffix) {
        this.eventManager.broadcast({ name: 'testResultListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-test-result-my-suffix-popup',
    template: ''
})
export class TestResultMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testResultPopupService: TestResultMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.testResultPopupService
                    .open(TestResultMySuffixDialogComponent as Component, params['id']);
            } else {
                this.testResultPopupService
                    .open(TestResultMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
