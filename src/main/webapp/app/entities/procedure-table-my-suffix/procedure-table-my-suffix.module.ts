import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App3SharedModule } from '../../shared';
import {
    ProcedureTableMySuffixService,
    ProcedureTableMySuffixPopupService,
    ProcedureTableMySuffixComponent,
    ProcedureTableMySuffixDetailComponent,
    ProcedureTableMySuffixDialogComponent,
    ProcedureTableMySuffixPopupComponent,
    ProcedureTableMySuffixDeletePopupComponent,
    ProcedureTableMySuffixDeleteDialogComponent,
    procedureTableRoute,
    procedureTablePopupRoute,
} from './';

const ENTITY_STATES = [
    ...procedureTableRoute,
    ...procedureTablePopupRoute,
];

@NgModule({
    imports: [
        App3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProcedureTableMySuffixComponent,
        ProcedureTableMySuffixDetailComponent,
        ProcedureTableMySuffixDialogComponent,
        ProcedureTableMySuffixDeleteDialogComponent,
        ProcedureTableMySuffixPopupComponent,
        ProcedureTableMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProcedureTableMySuffixComponent,
        ProcedureTableMySuffixDialogComponent,
        ProcedureTableMySuffixPopupComponent,
        ProcedureTableMySuffixDeleteDialogComponent,
        ProcedureTableMySuffixDeletePopupComponent,
    ],
    providers: [
        ProcedureTableMySuffixService,
        ProcedureTableMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App3ProcedureTableMySuffixModule {}
