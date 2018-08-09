import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rss-channel-info-dialog',
  templateUrl: './rss-channel-info-dialog.component.html'
})
export class RSSChannelInfoDialog implements OnInit {

  constructor(private dialogRef: MatDialogRef<RSSChannelInfoDialog>) { }
  
  ngOnInit() {
  }

}
