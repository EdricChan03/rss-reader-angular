import { Shared } from './../shared';
import { Settings } from './../app.component';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
	settings: Settings;
	constructor(private shared: Shared) { }

	reset() {
		let dialogRef = this.shared.openConfirmDialog({ title: "Reset settings?", msg: "Do you want to reset your settings?" });
		dialogRef.afterClosed().subscribe(result => {
			if (result == 'ok') {
				let tempSettings: Settings = {
					multipleRss: false,
					openNewTab: true,
					showImages: true
				}
				window.localStorage.setItem('settings', JSON.stringify(tempSettings));
				this.shared.openSnackBar({ msg: "Settings were reset", additionalOpts: { duration: 4000, horizontalPosition: 'start' } });
			}
		})
	}
	save() {
		window.localStorage.setItem('settings', JSON.stringify(this.settings));
		this.shared.openSnackBar({ msg: "Settings were saved", additionalOpts: { duration: 4000, horizontalPosition: 'start' } });
	}
	ngOnInit() {
		if (window.localStorage.getItem('settings')) {
			this.settings = <Settings>JSON.parse(window.localStorage.getItem('settings'));
		}
	}

}
