import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-share-dialog',
	templateUrl: './share-dialog.component.html',
	styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialog implements OnInit {
	url: string;
	feed: any;
	constructor(
		private dialogRef: MatDialogRef<ShareDialog>
	) {
		dialogRef.disableClose = true;
	}
	ngOnInit() {
		this.url = this.feed.link;
	}
	shareToFacebook() {
		window.open(`https://www.facebook.com/sharer.php?u=${encodeURI(this.feed.link)}`, '');
	}
	shareToTwitter() {

	}
	shareToGooglePlus() {
		// tslint:disable-next-line:max-line-length
		window.open(`https://plus.google.com/share?url=${encodeURI(this.feed.link)}&text=${encodeURI('Check out this blogpost by ' + this.feed.author + ' published on ' + this.feed.pubDate + ' titled "' + this.feed.title + '"!')}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	}
	shareNative() {
		if (navigator.share !== undefined) {
			navigator.share({
				title: document.title,
				text: 'Check out this page about"' + document.title + '"!',
				url: document.URL
			}).then(() => console.log('Successfully shared current page.'))
				.catch((error) => console.error('Error sharing current page: ', error));
		} else {
			// tslint:disable-next-line:max-line-length
			alert('To share natively, please enable the \'Experimental Web Platform Features\' flag in chrome://flags. Otherwise, it might not be supported on your platform right now.');
		}
	}
	dismiss() {
		this.dialogRef.close();
	}
}
