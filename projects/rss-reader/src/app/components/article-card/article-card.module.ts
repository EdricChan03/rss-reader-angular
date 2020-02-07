import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ArticleCardComponent } from './article-card.component';
import { PipesModule } from '../../pipe/pipes.module';
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
    MATERIAL_MODULES
  ],
  declarations: [
    ArticleCardComponent
  ],
  providers: [
    SettingsStorageService
  ],
  exports: [ArticleCardComponent]
})
export class ArticleCardModule { }
