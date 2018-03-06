import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProcedureTableMySuffix } from './procedure-table-my-suffix.model';
import { ProcedureTableMySuffixService } from './procedure-table-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-procedure-table-my-suffix',
    templateUrl: './procedure-table-my-suffix.component.html'
})
export class ProcedureTableMySuffixComponent implements OnInit, OnDestroy {
procedureTables: ProcedureTableMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private procedureTableService: ProcedureTableMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.procedureTableService.query().subscribe(
            (res: ResponseWrapper) => {
                this.procedureTables = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProcedureTables();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProcedureTableMySuffix) {
        return item.id;
    }
    registerChangeInProcedureTables() {
        this.eventSubscriber = this.eventManager.subscribe('procedureTableListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
