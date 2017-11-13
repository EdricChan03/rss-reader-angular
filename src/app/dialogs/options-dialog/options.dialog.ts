import { SharedInjectable } from '../../shared';
import { FeedOptions } from '../../home/home.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'options-dialog',
	templateUrl: './options.dialog.html'
})
export class OptionsDialog implements OnInit {
	constructor(private dialogRef: MatDialogRef<OptionsDialog>, private shared: SharedInjectable, private dialog: MatDialog){}
	options: FeedOptions;
	tempOptions: FeedOptions;
	cancel() {
		this.dialogRef.close();
	}
	save() {
		this.dialogRef.close();
		window.localStorage.setItem('feedOptions', JSON.stringify(this.options));
		let snackBarRef = this.shared.openSnackBarWithRef({msg: "Options saved", action: "Undo"})
		snackBarRef.onAction().subscribe(_ => {
			this.options = this.tempOptions;
			this.dialog.open(OptionsDialog);
		})
	}
	ngOnInit() {
		if (window.localStorage.getItem('feedOptions')) {
			this.options = <FeedOptions> JSON.parse(window.localStorage.getItem('feedOptions'));
			this.tempOptions = <FeedOptions> JSON.parse(window.localStorage.getItem('feedOptions'));
		} else {
			this.options = {
				amount: 20
			}
		}
	}
}