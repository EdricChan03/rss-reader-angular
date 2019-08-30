import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ReleaseNotesComponent } from './release-notes.component';

@NgModule({
  declarations: [ReleaseNotesComponent],
  exports: [ReleaseNotesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MarkdownModule.forChild()
  ]
})
export class ReleaseNotesModule { }
