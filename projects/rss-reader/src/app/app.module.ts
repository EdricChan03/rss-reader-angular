import 'hammerjs';

import { FeedCardComponent } from './feed-card/feed-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  OrderByPipe,
  StripHtmlTagsPipe,
  TruncatePipe
} from './pipe';
import { ActionItemsModule } from './actionitem.service';
import { AndroidComponent } from './devices/android/android.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DocViewerComponent } from './pages/doc-viewer/doc-viewer.component';
import { ExpansionPanelComponent } from './pages/expansion-panel/expansion-panel.component';
import { ExploreComponent } from './explore/explore.component';
import { FilterOverlayComponent } from './overlays/filter-overlay/filter-overlay.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GuideItemsService } from './guide-items';
import { GuideViewerComponent } from './pages/guide-viewer/guide-viewer.component';
import { GuidesListComponent } from './pages/guide-list/guide-list.component';
import { FeedComponent } from './feed/feed.component';
import { HttpClientModule } from '@angular/common/http';
import { IOSComponent } from './devices/ios/ios.component';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { NotificationsOverlayComponent } from './overlays/notifications-overlay/notifications-overlay.component';
import { OnboardingOverlayComponent } from './overlays/onboarding-overlay/onboarding-overlay.component';
import { OverlayService } from './overlay.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SettingsComponent } from './settings/settings.component';
import { DialogsModule } from './dialogs/dialogs.module';
import {
  SharedModule
} from './shared.service';
import { TestpageComponent } from './testpage/testpage.component';
import { WebComponent } from './devices/web/web.component';
import { environment } from '../environments/environment';
import { HeadlinesComponent } from './headlines/headlines.component';
import { HotkeysModule } from './hotkeys/hotkeys.module';
import { MarkdownModule } from 'ngx-markdown';

const OVERLAYS = [
  FilterOverlayComponent,
  OnboardingOverlayComponent,
  NotificationsOverlayComponent
];
const PIPES = [
  StripHtmlTagsPipe,
  TruncatePipe,
  OrderByPipe
];
@NgModule({
  declarations: [
    AppComponent,
    FeedCardComponent,
    PIPES,
    FeedComponent,
    SettingsComponent,
    TestpageComponent,
    PageNotFoundComponent,
    DocViewerComponent,
    GuideViewerComponent,
    GuidesListComponent,
    AndroidComponent,
    IOSComponent,
    ExpansionPanelComponent,
    WebComponent,
    ExploreComponent,
    OVERLAYS,
    HeadlinesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    // The scope parameter is specified such that the service worker only
    // applies to the /rss-reader URL.
    ServiceWorkerModule.register(environment.swLocation, { enabled: environment.production, scope: './' }),
    DialogsModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule.enablePersistence(),
    // AngularFireAuthModule,
    ActionItemsModule,
    HotkeysModule
  ],
  bootstrap: [AppComponent],
  providers: [
    GuideItemsService,
    OverlayService
  ],
  entryComponents: [
    OVERLAYS,
    ExpansionPanelComponent
  ]
})
export class AppModule { }
