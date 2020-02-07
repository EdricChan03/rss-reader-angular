import { Component, OnInit } from '@angular/core';

import { Settings } from '../../models/settings';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  themes = [
    'indigo-pink',
    'deeppurple-amber',
    'pink-bluegrey',
    'purple-green'
  ];
  constructor(private shared: SharedService) { }

  reset() {
    const dialogRef = this.shared.openConfirmDialog({ title: 'Reset settings?', msg: 'Do you want to reset your settings?' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        const tempSettings: Settings = {
          multipleRss: false,
          openNewTab: true,
          showImages: true,
          theme: 'indigo-pink',
          notifyNewReleases: true
        };
        window.localStorage.settings = JSON.stringify(tempSettings);
        // tslint:disable-next-line:max-line-length
        this.shared.openSnackBar({ msg: 'Settings successfully reset', additionalOpts: { duration: 4000, horizontalPosition: 'start' } });
      }
    });
  }
  save() {
    window.localStorage.settings = JSON.stringify(this.settings);
    // tslint:disable-next-line:max-line-length
    const snackBarRef = this.shared.openSnackBar({ msg: 'Settings saved', action: 'Reload', additionalOpts: { duration: 4000, horizontalPosition: 'start' } });
    snackBarRef.onAction().subscribe(() => {
      window.location.reload();
    });
  }
  ngOnInit() {
    if (window.localStorage.settings) {
      this.settings = JSON.parse(window.localStorage.settings) as Settings;
    }
  }

}
