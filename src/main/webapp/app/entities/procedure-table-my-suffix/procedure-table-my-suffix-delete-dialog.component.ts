import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProcedureTableMySuffix } from './procedure-table-my-suffix.model';
import { ProcedureTableMySuffixPopupService } from './procedure-table-my-suffix-popup.service';
import { ProcedureTableMySuffixService } from './procedure-table-my-suffix.service';

@Component({
    selector: 'jhi-procedure-table-my-suffix-delete-dialog',
    templateUrl: './procedure-table-my-suffix-delete-dialog.component.html'
})
export class ProcedureTableMySuffixDeleteDialogComponent {

    procedureTable: ProcedureTableMySuffix;

    constructor(
        private procedureTableService: ProcedureTableMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.procedureTableService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'procedureTableListModification',
                content: 'Deleted an procedureTable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-procedure-table-my-suffix-delete-popup',
    template: ''
})
export class ProcedureTableMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private procedureTablePopupService: ProcedureTableMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.procedureTablePopupService
                .open(ProcedureTableMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
