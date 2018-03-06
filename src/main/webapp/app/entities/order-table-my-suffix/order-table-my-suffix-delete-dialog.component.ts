import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderTableMySuffix } from './order-table-my-suffix.model';
import { OrderTableMySuffixPopupService } from './order-table-my-suffix-popup.service';
import { OrderTableMySuffixService } from './order-table-my-suffix.service';

@Component({
    selector: 'jhi-order-table-my-suffix-delete-dialog',
    templateUrl: './order-table-my-suffix-delete-dialog.component.html'
})
export class OrderTableMySuffixDeleteDialogComponent {

    orderTable: OrderTableMySuffix;

    constructor(
        private orderTableService: OrderTableMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderTableService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderTableListModification',
                content: 'Deleted an orderTable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-table-my-suffix-delete-popup',
    template: ''
})
export class OrderTableMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderTablePopupService: OrderTableMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderTablePopupService
                .open(OrderTableMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
