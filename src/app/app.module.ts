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
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent, SettingsDialog, FeedDialog } from './app.component';
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
		PageNotFoundComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormsModule,
		FlexLayoutModule,
		HttpModule,
		MaterialModule,
		AppRouting
	],
	bootstrap: [AppComponent],
	providers: [
		Shared
	],
	entryComponents: [
		DIALOGS
	]
})
export class AppModule {
}
