import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EquipmentMySuffix } from './equipment-my-suffix.model';
import { EquipmentMySuffixPopupService } from './equipment-my-suffix-popup.service';
import { EquipmentMySuffixService } from './equipment-my-suffix.service';
import { OrderTableMySuffix, OrderTableMySuffixService } from '../order-table-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-equipment-my-suffix-dialog',
    templateUrl: './equipment-my-suffix-dialog.component.html'
})
export class EquipmentMySuffixDialogComponent implements OnInit {

    equipment: EquipmentMySuffix;
    isSaving: boolean;

    ordertables: OrderTableMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private equipmentService: EquipmentMySuffixService,
        private orderTableService: OrderTableMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.orderTableService
            .query({filter: 'equipment-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.equipment.orderTableId) {
                    this.ordertables = res.json;
                } else {
                    this.orderTableService
                        .find(this.equipment.orderTableId)
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
        if (this.equipment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.equipmentService.update(this.equipment));
        } else {
            this.subscribeToSaveResponse(
                this.equipmentService.create(this.equipment));
        }
    }

    private subscribeToSaveResponse(result: Observable<EquipmentMySuffix>) {
        result.subscribe((res: EquipmentMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EquipmentMySuffix) {
        this.eventManager.broadcast({ name: 'equipmentListModification', content: 'OK'});
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
    selector: 'jhi-equipment-my-suffix-popup',
    template: ''
})
export class EquipmentMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private equipmentPopupService: EquipmentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.equipmentPopupService
                    .open(EquipmentMySuffixDialogComponent as Component, params['id']);
            } else {
                this.equipmentPopupService
                    .open(EquipmentMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
