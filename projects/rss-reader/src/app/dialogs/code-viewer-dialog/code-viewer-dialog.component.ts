import { Component, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as hljs from 'highlight.js';

@Component({
  selector: 'app-code-viewer-dialog',
  templateUrl: './code-viewer-dialog.component.html'
})
export class CodeViewerDialogComponent implements AfterViewInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngAfterViewInit() {
    hljs.highlightBlock(document.getElementById('code'));
  }
}
