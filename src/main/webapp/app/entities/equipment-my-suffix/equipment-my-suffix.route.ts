import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EquipmentMySuffixComponent } from './equipment-my-suffix.component';
import { EquipmentMySuffixDetailComponent } from './equipment-my-suffix-detail.component';
import { EquipmentMySuffixPopupComponent } from './equipment-my-suffix-dialog.component';
import { EquipmentMySuffixDeletePopupComponent } from './equipment-my-suffix-delete-dialog.component';

export const equipmentRoute: Routes = [
    {
        path: 'equipment-my-suffix',
        component: EquipmentMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.equipment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'equipment-my-suffix/:id',
        component: EquipmentMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.equipment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const equipmentPopupRoute: Routes = [
    {
        path: 'equipment-my-suffix-new',
        component: EquipmentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.equipment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'equipment-my-suffix/:id/edit',
        component: EquipmentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.equipment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'equipment-my-suffix/:id/delete',
        component: EquipmentMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.equipment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
