import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EquipmentMySuffix } from './equipment-my-suffix.model';
import { EquipmentMySuffixPopupService } from './equipment-my-suffix-popup.service';
import { EquipmentMySuffixService } from './equipment-my-suffix.service';

@Component({
    selector: 'jhi-equipment-my-suffix-delete-dialog',
    templateUrl: './equipment-my-suffix-delete-dialog.component.html'
})
export class EquipmentMySuffixDeleteDialogComponent {

    equipment: EquipmentMySuffix;

    constructor(
        private equipmentService: EquipmentMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.equipmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'equipmentListModification',
                content: 'Deleted an equipment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-equipment-my-suffix-delete-popup',
    template: ''
})
export class EquipmentMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private equipmentPopupService: EquipmentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.equipmentPopupService
                .open(EquipmentMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
