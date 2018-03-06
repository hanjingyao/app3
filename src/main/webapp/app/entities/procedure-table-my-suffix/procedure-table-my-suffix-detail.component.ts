import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProcedureTableMySuffix } from './procedure-table-my-suffix.model';
import { ProcedureTableMySuffixService } from './procedure-table-my-suffix.service';

@Component({
    selector: 'jhi-procedure-table-my-suffix-detail',
    templateUrl: './procedure-table-my-suffix-detail.component.html'
})
export class ProcedureTableMySuffixDetailComponent implements OnInit, OnDestroy {

    procedureTable: ProcedureTableMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private procedureTableService: ProcedureTableMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProcedureTables();
    }

    load(id) {
        this.procedureTableService.find(id).subscribe((procedureTable) => {
            this.procedureTable = procedureTable;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProcedureTables() {
        this.eventSubscriber = this.eventManager.subscribe(
            'procedureTableListModification',
            (response) => this.load(this.procedureTable.id)
        );
    }
}
