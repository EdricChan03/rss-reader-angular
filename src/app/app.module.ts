import 'hammerjs';

import { CodeViewerDialog, FeedCardComponent } from './feed-card/feed-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  OrderByPipe,
  StripHtmlTagsPipe,
  TruncatePipe
} from './pipe';
import { ActionIconsModule } from './actionitem.service';
import { AndroidComponent } from './devices/android/android.component';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { AppsOverlayComponent } from './overlays/apps-overlay/apps-overlay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DocViewer } from './pages/doc-viewer/doc-viewer.component';
import { ExpansionPanelComponent } from './pages/expansion-panel/expansion-panel.component';
import { ExploreComponent } from './explore/explore.component';
import { FilterOverlayComponent } from './overlays/filter-overlay/filter-overlay.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GuideItems } from './guide-items';
import { GuideViewer } from './pages/guide-viewer/guide-viewer.component';
import { GuidesList } from './pages/guide-list/guide-list.component';
import { HomeComponent } from './home/home.component';
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
import {
  AboutDialog,
  FeedDialog,
  OptionsDialog,
  RSSChannelInfoDialog,
  ShareDialog
} from './dialogs';
import {
  SharedModule
} from './shared.service';
import { TestpageComponent } from './testpage/testpage.component';
import { WebComponent } from './devices/web/web.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

const DIALOGS = [
  FeedDialog,
  CodeViewerDialog,
  ShareDialog,
  OptionsDialog,
  RSSChannelInfoDialog,
  AboutDialog
];
const OVERLAYS = [
  FilterOverlayComponent,
  OnboardingOverlayComponent,
  AppsOverlayComponent,
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
    DIALOGS,
    PIPES,
    HomeComponent,
    SettingsComponent,
    TestpageComponent,
    PageNotFoundComponent,
    DocViewer,
    GuideViewer,
    GuidesList,
    AndroidComponent,
    IOSComponent,
    ExpansionPanelComponent,
    WebComponent,
    ExploreComponent,
    OVERLAYS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    AppRouting,
    ServiceWorkerModule.register(environment.swLocation, { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    ActionIconsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    GuideItems,
    OverlayService
  ],
  entryComponents: [
    DIALOGS,
    OVERLAYS,
    ExpansionPanelComponent
  ]
})
export class AppModule {
}
