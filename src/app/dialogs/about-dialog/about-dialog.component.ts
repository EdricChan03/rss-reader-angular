import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html'
})
export class AboutDialogComponent {

  latestVersion = environment.latestVersion;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AboutDialogComponent>
  ) { }
  // TODO: Implement this method
  openVersionDialog() {

  }
}
