import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TestResultMySuffixComponent } from './test-result-my-suffix.component';
import { TestResultMySuffixDetailComponent } from './test-result-my-suffix-detail.component';
import { TestResultMySuffixPopupComponent } from './test-result-my-suffix-dialog.component';
import { TestResultMySuffixDeletePopupComponent } from './test-result-my-suffix-delete-dialog.component';

export const testResultRoute: Routes = [
    {
        path: 'test-result-my-suffix',
        component: TestResultMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'test-result-my-suffix/:id',
        component: TestResultMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testResultPopupRoute: Routes = [
    {
        path: 'test-result-my-suffix-new',
        component: TestResultMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-result-my-suffix/:id/edit',
        component: TestResultMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-result-my-suffix/:id/delete',
        component: TestResultMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
