import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EquipmentMySuffix } from './equipment-my-suffix.model';
import { EquipmentMySuffixService } from './equipment-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-equipment-my-suffix',
    templateUrl: './equipment-my-suffix.component.html'
})
export class EquipmentMySuffixComponent implements OnInit, OnDestroy {
equipment: EquipmentMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private equipmentService: EquipmentMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.equipmentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.equipment = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEquipment();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EquipmentMySuffix) {
        return item.id;
    }
    registerChangeInEquipment() {
        this.eventSubscriber = this.eventManager.subscribe('equipmentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
