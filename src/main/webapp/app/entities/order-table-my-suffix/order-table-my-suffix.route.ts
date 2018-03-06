import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrderTableMySuffixComponent } from './order-table-my-suffix.component';
import { OrderTableMySuffixDetailComponent } from './order-table-my-suffix-detail.component';
import { OrderTableMySuffixPopupComponent } from './order-table-my-suffix-dialog.component';
import { OrderTableMySuffixDeletePopupComponent } from './order-table-my-suffix-delete-dialog.component';

export const orderTableRoute: Routes = [
    {
        path: 'order-table-my-suffix',
        component: OrderTableMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.orderTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-table-my-suffix/:id',
        component: OrderTableMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.orderTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderTablePopupRoute: Routes = [
    {
        path: 'order-table-my-suffix-new',
        component: OrderTableMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.orderTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-table-my-suffix/:id/edit',
        component: OrderTableMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.orderTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-table-my-suffix/:id/delete',
        component: OrderTableMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.orderTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
