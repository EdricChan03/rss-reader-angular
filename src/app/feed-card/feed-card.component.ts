import { MdDialogRef, MdDialog } from '@angular/material';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as hljs from 'highlight.js';

@Component({
	selector: 'app-feed-card',
	templateUrl: './feed-card.component.html',
	styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {
	hasImage: boolean;
	imageExts = ['jpg', 'jpeg', 'png', 'gif'];
	imageSrc: string;
	@Input() feed: any;
	constructor(private dialog: MdDialog) { }
	showCode(feed) {
		let dialogRef = this.dialog.open(CodeViewerDialog);
		dialogRef.componentInstance.feed = feed;
	}
	ngOnInit() {
		if (this.feed.enclosure && this.feed.enclosure.length == undefined) {
			for (var i = 0, len = this.imageExts.length; i < len; ++i) {
				if (this.feed.enclosure.link.indexOf(this.imageExts[i]) != -1) {
					this.hasImage = true;
					this.imageSrc = encodeURI(this.feed.enclosure.link);
				}
			}
		}
	}
}

@Component({
	selector: 'code-dialog',
	template: `<h2 md-dialog-title>Code View</h2>
			   <md-dialog-content>
			  		<pre><code id="code" class="json">{{feed | json }}</code></pre>
				</md-dialog-content>
				<md-dialog-actions align="end">
					<button md-button color="primary" md-dialog-close>Close</button>
				</md-dialog-actions>
			   `
})
export class CodeViewerDialog implements AfterViewInit {
	feed: any;
	constructor(public dialogRef: MdDialogRef<CodeViewerDialog>) { }
	ngAfterViewInit() {
		hljs.highlightBlock(document.getElementById('code'));
	}
}