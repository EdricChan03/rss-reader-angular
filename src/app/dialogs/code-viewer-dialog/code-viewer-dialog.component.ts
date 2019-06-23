import { Component, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as hljs from 'highlight.js';

@Component({
  selector: 'app-code-viewer-dialog',
  templateUrl: './code-viewer-dialog.component.html'
})
// tslint:disable-next-line:component-class-suffix
export class CodeViewerDialogComponent implements AfterViewInit {
  feed: any;
  constructor(public dialogRef: MatDialogRef<CodeViewerDialogComponent>) { }
  ngAfterViewInit() {
    hljs.highlightBlock(document.getElementById('code'));
  }
}
