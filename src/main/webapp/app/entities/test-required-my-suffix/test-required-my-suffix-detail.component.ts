import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TestRequiredMySuffix } from './test-required-my-suffix.model';
import { TestRequiredMySuffixService } from './test-required-my-suffix.service';

@Component({
    selector: 'jhi-test-required-my-suffix-detail',
    templateUrl: './test-required-my-suffix-detail.component.html'
})
export class TestRequiredMySuffixDetailComponent implements OnInit, OnDestroy {

    testRequired: TestRequiredMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private testRequiredService: TestRequiredMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTestRequireds();
    }

    load(id) {
        this.testRequiredService.find(id).subscribe((testRequired) => {
            this.testRequired = testRequired;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTestRequireds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'testRequiredListModification',
            (response) => this.load(this.testRequired.id)
        );
    }
}
