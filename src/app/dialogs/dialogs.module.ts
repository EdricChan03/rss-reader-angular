import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';

import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { FeedDialogComponent } from './feed-dialog/feed-dialog.component';
import { FeedOptionsDialogComponent } from './feed-options-dialog/feed-options-dialog.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { CodeViewerDialogComponent } from './code-viewer-dialog/code-viewer-dialog.component';
import { RSSChannelInfoDialogComponent } from './rss-channel-info-dialog/rss-channel-info-dialog.component';
import { HeadlineOptionsDialogComponent } from './headline-options-dialog/headline-options-dialog.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

export const DIALOGS = [
  AboutDialogComponent,
  CodeViewerDialogComponent,
  FeedDialogComponent,
  FeedOptionsDialogComponent,
  HeadlineOptionsDialogComponent,
  RSSChannelInfoDialogComponent,
  ShareDialogComponent
]
const DIALOG_MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatTooltipModule
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DIALOG_MATERIAL_MODULES
  ],
  declarations: [
    DIALOGS
  ],
  entryComponents: [
    DIALOGS
  ],
  exports: [
    DIALOGS
  ]
})
export class DialogsModule { }
