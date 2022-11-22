import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { ArticleCardComponent } from './article-card.component';
import { DialogsModule } from '../../dialogs/dialogs.module';
import { PipesModule } from '../../pipe/pipes.module';
import { StripHtmlTagsPipe } from '../../pipe';
import { SettingsStorageService } from '../../core/settings-storage/settings-storage.service';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    MATERIAL_MODULES,
    DialogsModule
  ],
  declarations: [
    ArticleCardComponent
  ],
  providers: [
    SettingsStorageService,
    StripHtmlTagsPipe
  ],
  exports: [ArticleCardComponent]
})
export class ArticleCardModule { }
