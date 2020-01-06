import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
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
    MarkdownModule.forChild(),
    MATERIAL_MODULES,
    ReleaseNotesRoutingModule
  ]
})
export class ReleaseNotesModule { }
