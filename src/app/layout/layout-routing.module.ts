import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AartiComponent } from './aarti/aarti.component';
import { AddEventComponent } from './add-event/add-event.component';
import { DetailEventComponent } from './detail-event/detail-event.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { EventListComponent } from './event-list/event-list.component';

import { LayoutComponent } from './layout.component';
import { ManageTemplateComponent } from './manage-template/manage-template.component';
import { ManageTempleComponent } from './manage-temple/manage-temple.component';
import { NotificationComponent } from './notification/notification.component';
import { Screen1Component } from './screen1/screen1.component';
import { Screen2Component } from './screen2/screen2.component';
import { TempleImageComponent } from './temple-image/temple-image.component';
import { UpdateEventComponent } from './update-event/update-event.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'event-list',
                component: EventListComponent
            },
            {
                path: 'add-event',
                component: AddEventComponent
            },
            {
                path: 'aarti',
                component: AartiComponent
            }, {
                path: 'temple-image',
                component: TempleImageComponent
            },
            {
                path: 'updtae-event',
                component: UpdateEventComponent
            },
            {
                path: 'detail-event',
                component: DetailEventComponent
            },
            {
                path: 'notification',
                component: NotificationComponent
            }, {
                path: 'manage-template',
                component: ManageTemplateComponent
            }, {
                path: 'email-template',
                component: EmailTemplateComponent
            },
            {
                path: 'manage-temple',
                component: ManageTempleComponent
            },
            {
                path: 'screen1',
                loadChildren: () => import('./screen1/screen1.module').then(m => m.Screen1Module)
            },
            {
                path: 'screen2',
                component: Screen2Component
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
