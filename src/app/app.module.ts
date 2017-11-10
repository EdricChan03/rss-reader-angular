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
} from './pipe/index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	AlertDialog,
	ConfirmDialog,
	PromptDialog,
	SelectionDialog,
	Shared
} from './shared';
import 'hammerjs';

const SHARED_DIALOGS = [
	AlertDialog,
	ConfirmDialog,
	PromptDialog,
	SelectionDialog
]
const DIALOGS = [
	SHARED_DIALOGS,
	FeedDialog,
	CodeViewerDialog,
	ShareDialog,
	OptionsDialog
]
const PIPES = [
	StripHtmlTagsPipe,
	TruncatePipe,
	OrderByPipe
]
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
		GuidesList
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormsModule,
		FlexLayoutModule,
		HttpClientModule,
		MaterialModule,
		AppRouting
	],
	bootstrap: [AppComponent],
	providers: [
		Shared,
		GuideItems
	],
	entryComponents: [
		DIALOGS
	]
})
export class AppModule {
}
