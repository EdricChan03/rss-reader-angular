import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DialogsService } from '../../core/dialogs/dialogs.service';
import { SharedService } from '../../shared.service';
import { SettingsStorageService } from '../../core/settings-storage/settings-storage.service';
import { Theme, themes } from './types';

type SettingsForm = FormGroup<{
  openNewTab: FormControl<boolean>;
  showImages: FormControl<boolean>;
  theme: FormControl<Theme | null>;
  notifyNewReleases: FormControl<boolean | null>;
}>;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  settingsForm: SettingsForm = new FormGroup({
    openNewTab: new FormControl(false),
    showImages: new FormControl(false),
    theme: new FormControl<Theme>('indigo-pink'),
    notifyNewReleases: new FormControl(false)
  });
  themes = themes;
  constructor(
    private dialog: DialogsService,
    private shared: SharedService,
    private settingsStorage: SettingsStorageService
  ) {
    this.settingsForm.patchValue(settingsStorage.settings);
  }

  reset() {
    const dialogRef = this.dialog.openConfirmDialog({ title: 'Reset settings?', msg: 'Are you sure you want to reset the settings?' });
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
