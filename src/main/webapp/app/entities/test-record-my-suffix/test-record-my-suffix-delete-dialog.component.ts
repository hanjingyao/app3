import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TestRecordMySuffix } from './test-record-my-suffix.model';
import { TestRecordMySuffixPopupService } from './test-record-my-suffix-popup.service';
import { TestRecordMySuffixService } from './test-record-my-suffix.service';

@Component({
    selector: 'jhi-test-record-my-suffix-delete-dialog',
    templateUrl: './test-record-my-suffix-delete-dialog.component.html'
})
export class TestRecordMySuffixDeleteDialogComponent {

    testRecord: TestRecordMySuffix;

    constructor(
        private testRecordService: TestRecordMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testRecordService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'testRecordListModification',
                content: 'Deleted an testRecord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-record-my-suffix-delete-popup',
    template: ''
})
export class TestRecordMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testRecordPopupService: TestRecordMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.testRecordPopupService
                .open(TestRecordMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
