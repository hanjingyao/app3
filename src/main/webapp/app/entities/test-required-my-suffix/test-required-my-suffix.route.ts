import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TestRequiredMySuffixComponent } from './test-required-my-suffix.component';
import { TestRequiredMySuffixDetailComponent } from './test-required-my-suffix-detail.component';
import { TestRequiredMySuffixPopupComponent } from './test-required-my-suffix-dialog.component';
import { TestRequiredMySuffixDeletePopupComponent } from './test-required-my-suffix-delete-dialog.component';

export const testRequiredRoute: Routes = [
    {
        path: 'test-required-my-suffix',
        component: TestRequiredMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRequired.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'test-required-my-suffix/:id',
        component: TestRequiredMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRequired.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testRequiredPopupRoute: Routes = [
    {
        path: 'test-required-my-suffix-new',
        component: TestRequiredMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRequired.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-required-my-suffix/:id/edit',
        component: TestRequiredMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRequired.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-required-my-suffix/:id/delete',
        component: TestRequiredMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRequired.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
