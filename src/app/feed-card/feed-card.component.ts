import { DomSanitizer } from '@angular/platform-browser';
import { SharedInjectable } from '../shared';
import { ShareDialog } from '../dialogs/index';
import { Settings } from '../app.component';
import { MatDialogRef, MatDialog, MatSlideToggleChange } from '@angular/material';
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
	imageChanged: boolean = false;
	settings: Settings;
	@Input() feed: any;
	constructor(private dialog: MatDialog, private shared: SharedInjectable, private dom: DomSanitizer) { }
	share(feed: any) {
		let dialogRef = this.dialog.open(ShareDialog);
		dialogRef.componentInstance.feed = feed;
	}
	/**
	 * Shows how the object is structured in a dialog
	 * @param {any} feed The feed for the code view
	 */
	showCode(feed) {
		let dialogRef = this.dialog.open(CodeViewerDialog);
		dialogRef.componentInstance.feed = feed;
	}
	/**
	 * Views the current post in a dialog
	 * @param {any} feed The current post
	 */
	viewInDialog(feed) {
		let dialogRef = this.shared.openConfirmDialog({title: "Post", msg: this.dom.bypassSecurityTrustHtml(`<iframe src="${feed.link}" width="90%" height="90%"></iframe>`), isHtml: true, panelClass: 'post-dialog'});
		dialogRef.afterClosed().subscribe(result => {
			if (result == 'ok') {
				// Open post in new tab
				window.open(feed.link);
			} else {

			}
		})
	}
	/**
	 * Encodes an image
	 * @return {any}
	 * @desc More info at {@link https://stackoverflow.com/a/22172860/6782707}
	*/
	getBase64Image(img: HTMLImageElement): any {
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL("image/png");
		return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	}
	/**
	 * Toggles the image changed
	 */
	imageChange() {
		this.imageChanged = !this.imageChanged;
		this.hasImage = !this.hasImage;
	}
	/**
	 * Replaces the image
	 * @param {boolean} isThumbnail Whether the image is in the thumbnail of `enclosure` object
	 */
	replaceImg(isThumbnail?: boolean) {
		this.hasImage = true;
		if (isThumbnail) {
			if (this.feed.enclosure.thumbnail.indexOf("https://www.blog.googlehttps//") != -1) {
				let temp = this.feed.enclosure.thumbnail.replace("https://www.blog.googlehttps//", "https://");
				this.imageSrc = encodeURI(temp);
			} else {
				this.imageSrc = encodeURI(this.feed.enclosure.thumbnail);
			}
		} else {
			// Resolve issue with images where the RSS of the Google Blog is a bit broken
			if (this.feed.enclosure.link.indexOf("https://www.blog.googlehttps//") != -1) {
				let temp = this.feed.enclosure.link.replace("https://www.blog.googlehttps//", "https://");
				this.imageSrc = encodeURI(temp);
			} else {
				this.imageSrc = encodeURI(this.feed.enclosure.link);
			}
		}
	}
	/**
	 * Initialisation
	 */
	ngOnInit() {
		if (window.localStorage.getItem("settings")) {
			this.settings = <Settings>JSON.parse(window.localStorage.getItem("settings"));
			if (this.settings.openNewTab) {
				this.target = this.settings.openNewTab ? '_blank' : '_self';
			}
		}
		if (this.feed.enclosure && this.feed.enclosure.length == undefined && this.settings.showImages) {
			if (this.feed.enclosure.link) {
				this.replaceImg(false);
			} else if (this.feed.enclosure.thumbnail) {
				this.replaceImg(true);
			}
		}
	}
}

@Component({
	selector: 'code-dialog',
	template: `<h2 matDialogTitle>Code View</h2>
			   <mat-dialog-content>
			  		<pre><code id="code" class="json">{{feed | json }}</code></pre>
				</mat-dialog-content>
				<mat-dialog-actions align="end">
					<button mat-button color="primary" matDialogClose>Close</button>
				</mat-dialog-actions>
			   `
})
export class CodeViewerDialog implements AfterViewInit {
	feed: any;
	constructor(public dialogRef: MatDialogRef<CodeViewerDialog>) { }
	ngAfterViewInit() {
		hljs.highlightBlock(document.getElementById('code'));
	}
}