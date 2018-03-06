import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App3SharedModule } from '../../shared';
import {
    TestRequiredMySuffixService,
    TestRequiredMySuffixPopupService,
    TestRequiredMySuffixComponent,
    TestRequiredMySuffixDetailComponent,
    TestRequiredMySuffixDialogComponent,
    TestRequiredMySuffixPopupComponent,
    TestRequiredMySuffixDeletePopupComponent,
    TestRequiredMySuffixDeleteDialogComponent,
    testRequiredRoute,
    testRequiredPopupRoute,
} from './';

const ENTITY_STATES = [
    ...testRequiredRoute,
    ...testRequiredPopupRoute,
];

@NgModule({
    imports: [
        App3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TestRequiredMySuffixComponent,
        TestRequiredMySuffixDetailComponent,
        TestRequiredMySuffixDialogComponent,
        TestRequiredMySuffixDeleteDialogComponent,
        TestRequiredMySuffixPopupComponent,
        TestRequiredMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TestRequiredMySuffixComponent,
        TestRequiredMySuffixDialogComponent,
        TestRequiredMySuffixPopupComponent,
        TestRequiredMySuffixDeleteDialogComponent,
        TestRequiredMySuffixDeletePopupComponent,
    ],
    providers: [
        TestRequiredMySuffixService,
        TestRequiredMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App3TestRequiredMySuffixModule {}
