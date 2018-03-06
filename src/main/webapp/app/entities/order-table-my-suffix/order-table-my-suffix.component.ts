import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderTableMySuffix } from './order-table-my-suffix.model';
import { OrderTableMySuffixService } from './order-table-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-order-table-my-suffix',
    templateUrl: './order-table-my-suffix.component.html'
})
export class OrderTableMySuffixComponent implements OnInit, OnDestroy {
orderTables: OrderTableMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderTableService: OrderTableMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.orderTableService.query().subscribe(
            (res: ResponseWrapper) => {
                this.orderTables = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderTables();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrderTableMySuffix) {
        return item.id;
    }
    registerChangeInOrderTables() {
        this.eventSubscriber = this.eventManager.subscribe('orderTableListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
