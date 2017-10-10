import { MaterialModule } from './material.module';
import { OrderByPipe } from './pipe/orderby.pipe';
import { TruncatePipe } from './pipe/truncate.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent, SettingsDialog, FeedDialog } from './app.component';
import { FeedCardComponent, CodeViewerDialog } from './feed-card/feed-card.component';
import { StripHtmlTagsPipe } from './pipe/strip-html-tags.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutDialog, AlertDialog, ConfirmDialog, PromptDialog, SelectionDialog, Shared, CustomSnackBar } from './shared';
import 'hammerjs';

const SHARED_DIALOGS = [
	AboutDialog,
	AlertDialog,
	ConfirmDialog,
	PromptDialog,
	SelectionDialog
]
@NgModule({
	declarations: [
		AppComponent,
		FeedCardComponent,
		StripHtmlTagsPipe,
		TruncatePipe,
		SettingsDialog,
		FeedDialog,
		CodeViewerDialog,
		OrderByPipe,
		SHARED_DIALOGS,
		CustomSnackBar
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormsModule,
		FlexLayoutModule,
		HttpModule,
		MaterialModule
	],
	bootstrap: [AppComponent],
	providers: [
		Shared
	],
	entryComponents: [
		SettingsDialog,
		FeedDialog,
		CodeViewerDialog,
		SHARED_DIALOGS,
		CustomSnackBar
	]
})
export class AppModule {
}
