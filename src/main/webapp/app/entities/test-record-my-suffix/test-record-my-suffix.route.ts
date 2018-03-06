import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TestRecordMySuffixComponent } from './test-record-my-suffix.component';
import { TestRecordMySuffixDetailComponent } from './test-record-my-suffix-detail.component';
import { TestRecordMySuffixPopupComponent } from './test-record-my-suffix-dialog.component';
import { TestRecordMySuffixDeletePopupComponent } from './test-record-my-suffix-delete-dialog.component';

export const testRecordRoute: Routes = [
    {
        path: 'test-record-my-suffix',
        component: TestRecordMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'test-record-my-suffix/:id',
        component: TestRecordMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testRecordPopupRoute: Routes = [
    {
        path: 'test-record-my-suffix-new',
        component: TestRecordMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRecord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-record-my-suffix/:id/edit',
        component: TestRecordMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRecord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-record-my-suffix/:id/delete',
        component: TestRecordMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRecord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
