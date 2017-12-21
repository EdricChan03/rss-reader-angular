import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'share-dialog',
	templateUrl: './share.dialog.html',
	styleUrls: ['./share.dialog.scss']
})
export class ShareDialog implements OnInit {
	url: string;
	feed: any;
	constructor(private dialogRef: MatDialogRef<ShareDialog>) {
		dialogRef.disableClose = true;
	}
	ngOnInit() {
		this.url = this.feed.link;
	}
	shareToFacebook() {
		// tslint:disable-next-line:max-line-length
		window.open(`https://www.facebook.com/dialog/share?app_id=1192450764220117&display=popup&href=${encodeURI(this.feed.link)}&redirect_uri=https://chan4077.github.io/rss-reader&quote=${encodeURI('Check out this blogpost by ' + this.feed.author + ' published on ' + this.feed.pubDate + ' titled "' + this.feed.title + '"!')}`, '');
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
	cancel() {
		this.dialogRef.close();
	}
	share() {

	}
}