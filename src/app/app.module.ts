import { OverlayService } from './overlay.service';
import { ActionIconsModule } from './actionitem.service';
import { GuideItems } from './guide-items';
import { GuidesList } from './pages/guide-list/guide-list.component';
import { GuideViewer } from './pages/guide-viewer/guide-viewer.component';
import { DocViewer } from './pages/doc-viewer/doc-viewer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestpageComponent } from './testpage/testpage.component';
import { OptionsDialog } from './dialogs/options-dialog/options.dialog';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { AppRouting } from './app.routing';
import { ShareDialog } from './dialogs/index';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent, FeedDialog } from './app.component';
import { FeedCardComponent, CodeViewerDialog } from './feed-card/feed-card.component';
import {
	StripHtmlTagsPipe,
	TruncatePipe,
	OrderByPipe
} from './pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	SharedModule
} from './shared';
import 'hammerjs';
import { AndroidComponent } from './devices/android/android.component';
import { IOSComponent } from './devices/ios/ios.component';
import { ExpansionPanelComponent } from './pages/expansion-panel/expansion-panel.component';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { WebComponent } from './devices/web/web.component';
import { ExploreComponent } from './explore/explore.component';
import { FilterOverlayComponent } from './overlays/filter-overlay/filter-overlay.component';
import { OnboardingOverlayComponent } from './overlays/onboarding-overlay/onboarding-overlay.component';
import { RSSChannelInfoDialog } from './dialogs/rss-channel-info-dialog/rss-channel-info.dialog';
import { AppsOverlayComponent } from './overlays/apps-overlay/apps-overlay.component';
import { NotificationsOverlayComponent } from './overlays/notifications-overlay/notifications-overlay.component';

const DIALOGS = [
	FeedDialog,
	CodeViewerDialog,
	ShareDialog,
	OptionsDialog,
	RSSChannelInfoDialog
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