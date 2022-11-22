import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rss-channel-info-dialog',
  templateUrl: './rss-channel-info-dialog.component.html'
})
export class RSSChannelInfoDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RSSChannelInfoDialogComponent>) { }

  ngOnInit() {
  }

}
