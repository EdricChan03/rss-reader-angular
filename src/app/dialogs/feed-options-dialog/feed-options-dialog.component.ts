import { SharedService } from '../../shared.service';
import { FeedOptions } from '../../home/home.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-options-dialog',
  templateUrl: './feed-options-dialog.component.html'
})
export class FeedOptionsDialogComponent implements OnInit {
  options: FeedOptions;
  tempOptions: FeedOptions;
  constructor(
    private dialogRef: MatDialogRef<FeedOptionsDialogComponent>,
    private shared: SharedService,
    private dialog: MatDialog
  ) { }
  cancel() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close(this.options);
    window.localStorage.setItem('feedOptions', JSON.stringify(this.options));
    const snackBarRef = this.shared.openSnackBar({ msg: 'Options saved', action: 'Undo' });
    snackBarRef.onAction().subscribe(() => {
      this.options = this.tempOptions;
      this.dialog.open(FeedOptionsDialogComponent);
    });
  }
  ngOnInit() {
    if (window.localStorage.getItem('feedOptions')) {
      this.options = <FeedOptions>JSON.parse(window.localStorage.getItem('feedOptions'));
      this.tempOptions = <FeedOptions>JSON.parse(window.localStorage.getItem('feedOptions'));
    } else {
      this.options = {
        amount: 20
      };
    }
  }
}
