import { SharedInjectable } from '../shared';
import { Settings } from '../app.component';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
	settings: Settings;
	themes: any;
	constructor(private shared: SharedInjectable) { }

	reset() {
		const dialogRef = this.shared.openConfirmDialog({ title: 'Reset settings?', msg: 'Do you want to reset your settings?' });
		dialogRef.afterClosed().subscribe(result => {
			if (result === 'ok') {
				const tempSettings: Settings = {
					multipleRss: false,
					openNewTab: true,
					showImages: true,
					theme: 'indigo-pink'
				};
				window.localStorage.setItem('settings', JSON.stringify(tempSettings));
				// tslint:disable-next-line:max-line-length
				this.shared.openSnackBar({ msg: 'Settings successfully reset', additionalOpts: { duration: 4000, horizontalPosition: 'start', panelClass: 'mat-elevation-z3' } });
			}
		});
	}
	save() {
		window.localStorage.setItem('settings', JSON.stringify(this.settings));
		// tslint:disable-next-line:max-line-length
		const snackBarRef = this.shared.openSnackBar({ msg: 'Settings saved', action: 'Reload', additionalOpts: { duration: 4000, horizontalPosition: 'start', panelClass: 'mat-elevation-z3' } });
		snackBarRef.onAction().subscribe(_ => {
			window.location.reload(true);
		});
	}
	ngOnInit() {
		this.themes = ['indigo-pink', 'deeppurple-amber', 'pink-bluegrey', 'purple-green'];
		if (window.localStorage.getItem('settings')) {
			this.settings = <Settings>JSON.parse(window.localStorage.getItem('settings'));
		}
	}

}
