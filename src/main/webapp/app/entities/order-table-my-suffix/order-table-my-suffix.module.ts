import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App3SharedModule } from '../../shared';
import {
    OrderTableMySuffixService,
    OrderTableMySuffixPopupService,
    OrderTableMySuffixComponent,
    OrderTableMySuffixDetailComponent,
    OrderTableMySuffixDialogComponent,
    OrderTableMySuffixPopupComponent,
    OrderTableMySuffixDeletePopupComponent,
    OrderTableMySuffixDeleteDialogComponent,
    orderTableRoute,
    orderTablePopupRoute,
} from './';

const ENTITY_STATES = [
    ...orderTableRoute,
    ...orderTablePopupRoute,
];

@NgModule({
    imports: [
        App3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderTableMySuffixComponent,
        OrderTableMySuffixDetailComponent,
        OrderTableMySuffixDialogComponent,
        OrderTableMySuffixDeleteDialogComponent,
        OrderTableMySuffixPopupComponent,
        OrderTableMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        OrderTableMySuffixComponent,
        OrderTableMySuffixDialogComponent,
        OrderTableMySuffixPopupComponent,
        OrderTableMySuffixDeleteDialogComponent,
        OrderTableMySuffixDeletePopupComponent,
    ],
    providers: [
        OrderTableMySuffixService,
        OrderTableMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App3OrderTableMySuffixModule {}
