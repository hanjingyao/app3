import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TestRecordingMySuffixComponent } from './test-recording-my-suffix.component';
import { TestRecordingMySuffixDetailComponent } from './test-recording-my-suffix-detail.component';
import { TestRecordingMySuffixPopupComponent } from './test-recording-my-suffix-dialog.component';
import { TestRecordingMySuffixDeletePopupComponent } from './test-recording-my-suffix-delete-dialog.component';

export const testRecordingRoute: Routes = [
    {
        path: 'test-recording-my-suffix',
        component: TestRecordingMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRecording.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'test-recording-my-suffix/:id',
        component: TestRecordingMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRecording.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testRecordingPopupRoute: Routes = [
    {
        path: 'test-recording-my-suffix-new',
        component: TestRecordingMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRecording.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-recording-my-suffix/:id/edit',
        component: TestRecordingMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRecording.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'test-recording-my-suffix/:id/delete',
        component: TestRecordingMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app3App.testRecording.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
