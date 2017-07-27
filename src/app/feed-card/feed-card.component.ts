import { MdDialogRef, MdDialog } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-feed-card',
	templateUrl: './feed-card.component.html',
	styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent {

	@Input() feed: any;
	constructor(private dialog: MdDialog){}
	openLinkInBrowser() {
		window.open(this.feed.link);
	}
	showCode(feed) {
		let dialogRef = this.dialog.open(CodeViewerDialog);
		dialogRef.componentInstance.feed = feed;
	}
}

@Component({
	selector: 'code-dialog',
	template: `<h2 md-dialog-title>Code View</h2>
			   <md-dialog-content>
			  		<pre><code>{{feed | json }}</code></pre>
				</md-dialog-content>
				<md-dialog-actions>
					<button md-button color="primary" md-dialog-close>Close</button>
			   `
})
export class CodeViewerDialog {
	feed: any;
	constructor(public dialogRef: MdDialogRef<CodeViewerDialog>){}
}