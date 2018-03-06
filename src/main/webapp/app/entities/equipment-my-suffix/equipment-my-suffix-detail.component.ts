import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EquipmentMySuffix } from './equipment-my-suffix.model';
import { EquipmentMySuffixService } from './equipment-my-suffix.service';

@Component({
    selector: 'jhi-equipment-my-suffix-detail',
    templateUrl: './equipment-my-suffix-detail.component.html'
})
export class EquipmentMySuffixDetailComponent implements OnInit, OnDestroy {

    equipment: EquipmentMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private equipmentService: EquipmentMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEquipment();
    }

    load(id) {
        this.equipmentService.find(id).subscribe((equipment) => {
            this.equipment = equipment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEquipment() {
        this.eventSubscriber = this.eventManager.subscribe(
            'equipmentListModification',
            (response) => this.load(this.equipment.id)
        );
    }
}
