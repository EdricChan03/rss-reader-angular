import { Settings } from './../app.component';
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
	target: string;
	@Input() feed: any;
	constructor(private dialog: MdDialog) { }
	showCode(feed) {
		let dialogRef = this.dialog.open(CodeViewerDialog);
		dialogRef.componentInstance.feed = feed;
	}
	/*
		Solution from here:
		https://stackoverflow.com/a/22172860/6782707
	*/
	getBase64Image(img: HTMLImageElement) {
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL("image/png");
		return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	}
	ngOnInit() {
		if (this.feed.enclosure && this.feed.enclosure.length == undefined) {
			for (var i = 0; i < this.imageExts.length; i++) {
				if (this.feed.enclosure.link.indexOf(this.imageExts[i]) != -1) {
					console.log("YEAH!");
					this.hasImage = true;
					this.imageSrc = this.feed.enclosure.link;
				}
			}
		}
		if (window.localStorage.getItem("settings")) {
			let settings = <Settings> JSON.stringify(window.localStorage.getItem("settings"));
			console.log(settings.openNewTab);
			if (settings.openNewTab) {
				this.target = settings.openNewTab ? '_blank' : '_self';
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