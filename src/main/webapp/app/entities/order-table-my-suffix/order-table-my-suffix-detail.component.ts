import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrderTableMySuffix } from './order-table-my-suffix.model';
import { OrderTableMySuffixService } from './order-table-my-suffix.service';

@Component({
    selector: 'jhi-order-table-my-suffix-detail',
    templateUrl: './order-table-my-suffix-detail.component.html'
})
export class OrderTableMySuffixDetailComponent implements OnInit, OnDestroy {

    orderTable: OrderTableMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderTableService: OrderTableMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderTables();
    }

    load(id) {
        this.orderTableService.find(id).subscribe((orderTable) => {
            this.orderTable = orderTable;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderTables() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderTableListModification',
            (response) => this.load(this.orderTable.id)
        );
    }
}
