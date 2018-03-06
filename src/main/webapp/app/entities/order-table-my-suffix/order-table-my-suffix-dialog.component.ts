import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderTableMySuffix } from './order-table-my-suffix.model';
import { OrderTableMySuffixPopupService } from './order-table-my-suffix-popup.service';
import { OrderTableMySuffixService } from './order-table-my-suffix.service';

@Component({
    selector: 'jhi-order-table-my-suffix-dialog',
    templateUrl: './order-table-my-suffix-dialog.component.html'
})
export class OrderTableMySuffixDialogComponent implements OnInit {

    orderTable: OrderTableMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private orderTableService: OrderTableMySuffixService,
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
        if (this.orderTable.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderTableService.update(this.orderTable));
        } else {
            this.subscribeToSaveResponse(
                this.orderTableService.create(this.orderTable));
        }
    }

    private subscribeToSaveResponse(result: Observable<OrderTableMySuffix>) {
        result.subscribe((res: OrderTableMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderTableMySuffix) {
        this.eventManager.broadcast({ name: 'orderTableListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-order-table-my-suffix-popup',
    template: ''
})
export class OrderTableMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderTablePopupService: OrderTableMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderTablePopupService
                    .open(OrderTableMySuffixDialogComponent as Component, params['id']);
            } else {
                this.orderTablePopupService
                    .open(OrderTableMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
