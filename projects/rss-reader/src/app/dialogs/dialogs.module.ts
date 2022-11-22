import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatRippleModule } from '@angular/material/core';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { RouterModule } from '@angular/router';

import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { CodeViewerDialogComponent } from './code-viewer-dialog/code-viewer-dialog.component';
import { FeedDialogComponent } from './feed-dialog/feed-dialog.component';
import { HeadlineOptionsDialogComponent } from './headline-options-dialog/headline-options-dialog.component';
import { RSSChannelInfoDialogComponent } from './rss-channel-info-dialog/rss-channel-info-dialog.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { SubmitRssDialogComponent } from './submit-rss-dialog/submit-rss-dialog.component';


export const DIALOGS = [
  AboutDialogComponent,
  CodeViewerDialogComponent,
  FeedDialogComponent,
  HeadlineOptionsDialogComponent,
  RSSChannelInfoDialogComponent,
  ShareDialogComponent,
  SubmitRssDialogComponent
];

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
  MatRippleModule,
  MatSelectModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DIALOG_MATERIAL_MODULES
  ],
  declarations: [
    DIALOGS
  ],
  // From Angular v9 and above, it's no longer required to specify
  // the entryComponents field with Ivy.
  // See https://angular.io/guide/deprecations#entryComponents for more info.
  /* entryComponents: [
    DIALOGS
  ], */
  exports: [
    DIALOGS
  ]
})
export class DialogsModule { }
