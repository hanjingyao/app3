import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProcedureTableMySuffix } from './procedure-table-my-suffix.model';
import { ProcedureTableMySuffixPopupService } from './procedure-table-my-suffix-popup.service';
import { ProcedureTableMySuffixService } from './procedure-table-my-suffix.service';
import { OrderTableMySuffix, OrderTableMySuffixService } from '../order-table-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-procedure-table-my-suffix-dialog',
    templateUrl: './procedure-table-my-suffix-dialog.component.html'
})
export class ProcedureTableMySuffixDialogComponent implements OnInit {

    procedureTable: ProcedureTableMySuffix;
    isSaving: boolean;

    ordertables: OrderTableMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private procedureTableService: ProcedureTableMySuffixService,
        private orderTableService: OrderTableMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.orderTableService
            .query({filter: 'proceduretable-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.procedureTable.orderTableId) {
                    this.ordertables = res.json;
                } else {
                    this.orderTableService
                        .find(this.procedureTable.orderTableId)
                        .subscribe((subRes: OrderTableMySuffix) => {
                            this.ordertables = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.procedureTable.id !== undefined) {
            this.subscribeToSaveResponse(
                this.procedureTableService.update(this.procedureTable));
        } else {
            this.subscribeToSaveResponse(
                this.procedureTableService.create(this.procedureTable));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProcedureTableMySuffix>) {
        result.subscribe((res: ProcedureTableMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProcedureTableMySuffix) {
        this.eventManager.broadcast({ name: 'procedureTableListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrderTableById(index: number, item: OrderTableMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-procedure-table-my-suffix-popup',
    template: ''
})
export class ProcedureTableMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private procedureTablePopupService: ProcedureTableMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.procedureTablePopupService
                    .open(ProcedureTableMySuffixDialogComponent as Component, params['id']);
            } else {
                this.procedureTablePopupService
                    .open(ProcedureTableMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
