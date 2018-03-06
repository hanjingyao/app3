import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TestRequiredMySuffix } from './test-required-my-suffix.model';
import { TestRequiredMySuffixPopupService } from './test-required-my-suffix-popup.service';
import { TestRequiredMySuffixService } from './test-required-my-suffix.service';
import { TestResultMySuffix, TestResultMySuffixService } from '../test-result-my-suffix';
import { TestRecordMySuffix, TestRecordMySuffixService } from '../test-record-my-suffix';
import { ProcedureTableMySuffix, ProcedureTableMySuffixService } from '../procedure-table-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-test-required-my-suffix-dialog',
    templateUrl: './test-required-my-suffix-dialog.component.html'
})
export class TestRequiredMySuffixDialogComponent implements OnInit {

    testRequired: TestRequiredMySuffix;
    isSaving: boolean;

    testresults: TestResultMySuffix[];

    testrecords: TestRecordMySuffix[];

    proceduretables: ProcedureTableMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private testRequiredService: TestRequiredMySuffixService,
        private testResultService: TestResultMySuffixService,
        private testRecordService: TestRecordMySuffixService,
        private procedureTableService: ProcedureTableMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.testResultService
            .query({filter: 'testrequired-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.testRequired.testResultId) {
                    this.testresults = res.json;
                } else {
                    this.testResultService
                        .find(this.testRequired.testResultId)
                        .subscribe((subRes: TestResultMySuffix) => {
                            this.testresults = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.testRecordService
            .query({filter: 'testrequired-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.testRequired.testRecordId) {
                    this.testrecords = res.json;
                } else {
                    this.testRecordService
                        .find(this.testRequired.testRecordId)
                        .subscribe((subRes: TestRecordMySuffix) => {
                            this.testrecords = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.procedureTableService.query()
            .subscribe((res: ResponseWrapper) => { this.proceduretables = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.testRequired.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testRequiredService.update(this.testRequired));
        } else {
            this.subscribeToSaveResponse(
                this.testRequiredService.create(this.testRequired));
        }
    }

    private subscribeToSaveResponse(result: Observable<TestRequiredMySuffix>) {
        result.subscribe((res: TestRequiredMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TestRequiredMySuffix) {
        this.eventManager.broadcast({ name: 'testRequiredListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTestResultById(index: number, item: TestResultMySuffix) {
        return item.id;
    }

    trackTestRecordById(index: number, item: TestRecordMySuffix) {
        return item.id;
    }

    trackProcedureTableById(index: number, item: ProcedureTableMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-test-required-my-suffix-popup',
    template: ''
})
export class TestRequiredMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testRequiredPopupService: TestRequiredMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.testRequiredPopupService
                    .open(TestRequiredMySuffixDialogComponent as Component, params['id']);
            } else {
                this.testRequiredPopupService
                    .open(TestRequiredMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
