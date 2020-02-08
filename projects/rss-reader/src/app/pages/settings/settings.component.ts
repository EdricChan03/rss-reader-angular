import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SharedService } from '../../shared.service';
import { SettingsStorageService } from '../../core/settings-storage/settings-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  settingsForm: FormGroup;
  themes = [
    'indigo-pink',
    'deeppurple-amber',
    'pink-bluegrey',
    'purple-green'
  ];
  constructor(
    fb: FormBuilder,
    private shared: SharedService,
    private settingsStorage: SettingsStorageService
  ) {
    this.settingsForm = fb.group({
      openNewTab: false,
      showImages: false,
      theme: 'indigo-pink',
      notifyNewReleases: false
    });
    this.settingsForm.patchValue(settingsStorage.settings);
  }

  reset() {
    const dialogRef = this.shared.openConfirmDialog({ title: 'Reset settings?', msg: 'Do you want to reset your settings?' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.settingsStorage.clearSettings(/* resetToDefault = true */);
        this.shared.openSnackBar({ msg: 'Settings successfully reset' });
      }
    });
  }
  save() {
    this.settingsStorage.setSettings(this.settingsForm.value);
    const snackBarRef = this.shared.openSnackBar({ msg: 'Settings saved', action: 'Reload' });
    snackBarRef.onAction().subscribe(() => {
      window.location.reload();
    });
  }

}
