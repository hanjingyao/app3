import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TestResultMySuffix } from './test-result-my-suffix.model';
import { TestResultMySuffixPopupService } from './test-result-my-suffix-popup.service';
import { TestResultMySuffixService } from './test-result-my-suffix.service';

@Component({
    selector: 'jhi-test-result-my-suffix-delete-dialog',
    templateUrl: './test-result-my-suffix-delete-dialog.component.html'
})
export class TestResultMySuffixDeleteDialogComponent {

    testResult: TestResultMySuffix;

    constructor(
        private testResultService: TestResultMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testResultService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'testResultListModification',
                content: 'Deleted an testResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-result-my-suffix-delete-popup',
    template: ''
})
export class TestResultMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testResultPopupService: TestResultMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.testResultPopupService
                .open(TestResultMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
