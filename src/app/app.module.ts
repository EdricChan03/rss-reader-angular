import { TruncatePipe } from './pipe/truncate.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
// Material design.
import { MdCardModule, MdToolbarModule, MdButtonModule, MdIconModule, MdProgressBarModule, MdDialogModule, MdMenuModule, MdCheckboxModule, MdInputModule, MdSelectModule, MdChipsModule, MdSidenavModule } from '@angular/material';
import { AppComponent, SettingsDialog, FeedDialog } from './app.component';
import { FeedCardComponent, CodeViewerDialog } from './feed-card/feed-card.component';
import { FeedService } from './feed.service';
import { StripHtmlTagsPipe } from './pipe/strip-html-tags.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
export const MATERIAL_MODULES = [
	MdCardModule,
	MdToolbarModule,
	MdButtonModule,
	MdIconModule,
	MdProgressBarModule,
	MdDialogModule,
	MdMenuModule,
	MdCheckboxModule,
	MdInputModule,
	MdSelectModule,
	MdChipsModule,
	MdSidenavModule
]
@NgModule({
	declarations: [
		AppComponent,
		FeedCardComponent,
		StripHtmlTagsPipe,
		TruncatePipe,
		SettingsDialog,
		FeedDialog,
		CodeViewerDialog
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		FlexLayoutModule,
		HttpModule,
		MATERIAL_MODULES
	],
	providers: [FeedService],
	bootstrap: [AppComponent],
	entryComponents: [
		SettingsDialog,
		FeedDialog,
		CodeViewerDialog
	]
})
export class AppModule {
}
