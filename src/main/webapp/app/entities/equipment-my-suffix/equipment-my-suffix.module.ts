import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App3SharedModule } from '../../shared';
import {
    EquipmentMySuffixService,
    EquipmentMySuffixPopupService,
    EquipmentMySuffixComponent,
    EquipmentMySuffixDetailComponent,
    EquipmentMySuffixDialogComponent,
    EquipmentMySuffixPopupComponent,
    EquipmentMySuffixDeletePopupComponent,
    EquipmentMySuffixDeleteDialogComponent,
    equipmentRoute,
    equipmentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...equipmentRoute,
    ...equipmentPopupRoute,
];

@NgModule({
    imports: [
        App3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EquipmentMySuffixComponent,
        EquipmentMySuffixDetailComponent,
        EquipmentMySuffixDialogComponent,
        EquipmentMySuffixDeleteDialogComponent,
        EquipmentMySuffixPopupComponent,
        EquipmentMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EquipmentMySuffixComponent,
        EquipmentMySuffixDialogComponent,
        EquipmentMySuffixPopupComponent,
        EquipmentMySuffixDeleteDialogComponent,
        EquipmentMySuffixDeletePopupComponent,
    ],
    providers: [
        EquipmentMySuffixService,
        EquipmentMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App3EquipmentMySuffixModule {}
