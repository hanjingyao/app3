import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProcedureTableMySuffixComponent } from './procedure-table-my-suffix.component';
import { ProcedureTableMySuffixDetailComponent } from './procedure-table-my-suffix-detail.component';
import { ProcedureTableMySuffixPopupComponent } from './procedure-table-my-suffix-dialog.component';
import { ProcedureTableMySuffixDeletePopupComponent } from './procedure-table-my-suffix-delete-dialog.component';

export const procedureTableRoute: Routes = [
    {
        path: 'procedure-table-my-suffix',
        component: ProcedureTableMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.procedureTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'procedure-table-my-suffix/:id',
        component: ProcedureTableMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.procedureTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const procedureTablePopupRoute: Routes = [
    {
        path: 'procedure-table-my-suffix-new',
        component: ProcedureTableMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.procedureTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'procedure-table-my-suffix/:id/edit',
        component: ProcedureTableMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.procedureTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'procedure-table-my-suffix/:id/delete',
        component: ProcedureTableMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.procedureTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
