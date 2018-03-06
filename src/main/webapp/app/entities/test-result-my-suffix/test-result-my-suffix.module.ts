import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App3SharedModule } from '../../shared';
import {
    TestResultMySuffixService,
    TestResultMySuffixPopupService,
    TestResultMySuffixComponent,
    TestResultMySuffixDetailComponent,
    TestResultMySuffixDialogComponent,
    TestResultMySuffixPopupComponent,
    TestResultMySuffixDeletePopupComponent,
    TestResultMySuffixDeleteDialogComponent,
    testResultRoute,
    testResultPopupRoute,
} from './';

const ENTITY_STATES = [
    ...testResultRoute,
    ...testResultPopupRoute,
];

@NgModule({
    imports: [
        App3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TestResultMySuffixComponent,
        TestResultMySuffixDetailComponent,
        TestResultMySuffixDialogComponent,
        TestResultMySuffixDeleteDialogComponent,
        TestResultMySuffixPopupComponent,
        TestResultMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TestResultMySuffixComponent,
        TestResultMySuffixDialogComponent,
        TestResultMySuffixPopupComponent,
        TestResultMySuffixDeleteDialogComponent,
        TestResultMySuffixDeletePopupComponent,
    ],
    providers: [
        TestResultMySuffixService,
        TestResultMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App3TestResultMySuffixModule {}
