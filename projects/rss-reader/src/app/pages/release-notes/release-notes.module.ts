import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ReleaseNotesRoutingModule } from './release-notes-routing.module';
import { ReleaseNotesComponent } from './release-notes.component';

@NgModule({
  declarations: [ReleaseNotesComponent],
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
    ReleaseNotesRoutingModule
  ]
})
export class ReleaseNotesModule { }
