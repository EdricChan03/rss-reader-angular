import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
	selector: 'share-dialog',
	templateUrl: './share.dialog.html'
})
export class ShareDialog {
	constructor(private dialogRef: MatDialogRef<ShareDialog>){
		dialogRef.disableClose = true;
	}
	shareNative() {
		/**
		 * @todo
		 */
		// if (navigator.share !== undefined) {
		// 	navigator.share({
		// 		title: document.title,
		// 		text: "Check out this page about\"" + document.title + "\"!",
		// 		url: document.URL
		// 	}).then(()=> console.log("Successfully shared current page."))
		// 	   .catch((error) => console.error("Error sharing current page: ", error));
		// } else {
		// 	alert("To share natively, please enable the 'Experimental Web Platform Features' flag in chrome://flags. Otherwise, it might not be supported on your platform right now.")
		// }
	}
	feed: any;
	cancel() {
		this.dialogRef.close();
	}
	share() {

	}
}