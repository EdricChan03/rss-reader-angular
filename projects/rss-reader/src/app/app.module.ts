import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import 'hammerjs';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from '../environments/environment';
import { ActionItemsModule } from './actionitem.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DialogsModule } from './dialogs/dialogs.module';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { FeedComponent } from './feed/feed.component';
import { GuideItemsService } from './guide-items';
import { HeadlinesComponent } from './headlines/headlines.component';
import { HotkeysModule } from './hotkeys/hotkeys.module';
import { MaterialModule } from './material.module';
import { OverlayService } from './overlay.service';
import { OnboardingOverlayComponent } from './overlays/onboarding-overlay/onboarding-overlay.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DocViewerComponent } from './pages/doc-viewer/doc-viewer.component';
import { ExpansionPanelComponent } from './pages/expansion-panel/expansion-panel.component';
import { GuidesListComponent } from './pages/guide-list/guide-list.component';
import { GuideViewerComponent } from './pages/guide-viewer/guide-viewer.component';
import { OrderByPipe, StripHtmlTagsPipe, TruncatePipe } from './pipe';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from './shared.service';
import { TestpageComponent } from './testpage/testpage.component';


const OVERLAYS = [
  OnboardingOverlayComponent
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
    ExpansionPanelComponent,
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
    // ServiceWorkerModule.register(environment.swLocation, { enabled: environment.production, scope: './' }),
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production, scope: './' }),
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
