import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ReleaseNotesRoutingModule } from './release-notes-routing.module';
import { ReleaseNotesComponent } from './release-notes.component';

const MATERIAL_MODULES = [
  MatChipsModule
];

@NgModule({
  declarations: [ReleaseNotesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MarkdownModule.forChild(),
    ReleaseNotesRoutingModule,
    MATERIAL_MODULES
  ]
})
export class ReleaseNotesModule { }
