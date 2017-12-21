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

	}
	shareToTwitter() {
		
	}
	shareToGooglePlus() {
		
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