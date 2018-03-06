import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TestRequiredMySuffix } from './test-required-my-suffix.model';
import { TestRequiredMySuffixPopupService } from './test-required-my-suffix-popup.service';
import { TestRequiredMySuffixService } from './test-required-my-suffix.service';

@Component({
    selector: 'jhi-test-required-my-suffix-delete-dialog',
    templateUrl: './test-required-my-suffix-delete-dialog.component.html'
})
export class TestRequiredMySuffixDeleteDialogComponent {

    testRequired: TestRequiredMySuffix;

    constructor(
        private testRequiredService: TestRequiredMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testRequiredService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'testRequiredListModification',
                content: 'Deleted an testRequired'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-required-my-suffix-delete-popup',
    template: ''
})
export class TestRequiredMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testRequiredPopupService: TestRequiredMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.testRequiredPopupService
                .open(TestRequiredMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
