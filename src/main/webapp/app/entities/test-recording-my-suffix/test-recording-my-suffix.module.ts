import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App3SharedModule } from '../../shared';
import {
    TestRecordingMySuffixService,
    TestRecordingMySuffixPopupService,
    TestRecordingMySuffixComponent,
    TestRecordingMySuffixDetailComponent,
    TestRecordingMySuffixDialogComponent,
    TestRecordingMySuffixPopupComponent,
    TestRecordingMySuffixDeletePopupComponent,
    TestRecordingMySuffixDeleteDialogComponent,
    testRecordingRoute,
    testRecordingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...testRecordingRoute,
    ...testRecordingPopupRoute,
];

@NgModule({
    imports: [
        App3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TestRecordingMySuffixComponent,
        TestRecordingMySuffixDetailComponent,
        TestRecordingMySuffixDialogComponent,
        TestRecordingMySuffixDeleteDialogComponent,
        TestRecordingMySuffixPopupComponent,
        TestRecordingMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TestRecordingMySuffixComponent,
        TestRecordingMySuffixDialogComponent,
        TestRecordingMySuffixPopupComponent,
        TestRecordingMySuffixDeleteDialogComponent,
        TestRecordingMySuffixDeletePopupComponent,
    ],
    providers: [
        TestRecordingMySuffixService,
        TestRecordingMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App3TestRecordingMySuffixModule {}
