import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { Screen2Component } from './screen2/screen2.component';
import { EventListComponent } from './event-list/event-list.component';
import { AddEventComponent } from './add-event/add-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonationUrlFormComponent } from './donation-url-form/donation-url-form.component';
import { EventTimeFormComponent } from './event-time-form/event-time-form.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { DetailEventComponent } from './detail-event/detail-event.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { IframeLoadComponent } from './iframe-load/iframe-load.component';
import { ManageTemplateComponent } from './manage-template/manage-template.component';
import { TemplateDetailComponent } from './template-detail/template-detail.component';
import { ReportComponent } from './report/report.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { ManageTempleComponent } from './manage-temple/manage-temple.component';
import { AartiComponent } from './aarti/aarti.component';
import { TempleImageComponent } from './temple-image/temple-image.component';
import { EventImageComponent } from './event-image/event-image.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    declarations: [
        Screen2Component,
        LayoutComponent,
        NavComponent,
        TopnavComponent,
        SidebarComponent,
        EventListComponent,
        AddEventComponent,
        DonationUrlFormComponent,
        EventTimeFormComponent,
        UpdateEventComponent,
        DetailEventComponent,
        NotificationComponent,
        NotificationDetailComponent,
        IframeLoadComponent,
        ManageTemplateComponent,
        TemplateDetailComponent,
        ReportComponent,
        EmailTemplateComponent,
        ManageTempleComponent,
        AartiComponent,
        TempleImageComponent,
        EventImageComponent
    ]

})
export class LayoutModule { }
