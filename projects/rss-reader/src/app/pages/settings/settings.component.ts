import { Component } from '@angular/core';

import { Settings } from '../../models/settings';
import { SharedService } from '../../shared.service';
import { SettingsStorageService } from '../../core/settings-storage/settings-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  settings: Settings;
  themes = [
    'indigo-pink',
    'deeppurple-amber',
    'pink-bluegrey',
    'purple-green'
  ];
  constructor(
    private shared: SharedService,
    private settingsStorage: SettingsStorageService
  ) { }

  reset() {
    const dialogRef = this.shared.openConfirmDialog({ title: 'Reset settings?', msg: 'Do you want to reset your settings?' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        const defaultSettings: Settings = {
          multipleRss: false,
          openNewTab: true,
          showImages: true,
          theme: 'indigo-pink',
          notifyNewReleases: true
        };
        this.settingsStorage.setSettings(tempSettings);
        this.shared.openSnackBar({ msg: 'Settings successfully reset' });
      }
    });
  }
  save() {
    this.settingsStorage.setSettings(this.settings);
    const snackBarRef = this.shared.openSnackBar({ msg: 'Settings saved', action: 'Reload' });
    snackBarRef.onAction().subscribe(() => {
      window.location.reload();
    });
  }

}
