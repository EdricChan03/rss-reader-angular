import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    FlexLayoutModule,
    RouterModule,
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
