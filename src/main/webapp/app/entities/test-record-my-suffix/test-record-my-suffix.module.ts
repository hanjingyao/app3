import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App3SharedModule } from '../../shared';
import {
    TestRecordMySuffixService,
    TestRecordMySuffixPopupService,
    TestRecordMySuffixComponent,
    TestRecordMySuffixDetailComponent,
    TestRecordMySuffixDialogComponent,
    TestRecordMySuffixPopupComponent,
    TestRecordMySuffixDeletePopupComponent,
    TestRecordMySuffixDeleteDialogComponent,
    testRecordRoute,
    testRecordPopupRoute,
} from './';

const ENTITY_STATES = [
    ...testRecordRoute,
    ...testRecordPopupRoute,
];

@NgModule({
    imports: [
        App3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TestRecordMySuffixComponent,
        TestRecordMySuffixDetailComponent,
        TestRecordMySuffixDialogComponent,
        TestRecordMySuffixDeleteDialogComponent,
        TestRecordMySuffixPopupComponent,
        TestRecordMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TestRecordMySuffixComponent,
        TestRecordMySuffixDialogComponent,
        TestRecordMySuffixPopupComponent,
        TestRecordMySuffixDeleteDialogComponent,
        TestRecordMySuffixDeletePopupComponent,
    ],
    providers: [
        TestRecordMySuffixService,
        TestRecordMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App3TestRecordMySuffixModule {}
