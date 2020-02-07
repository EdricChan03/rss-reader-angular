import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Settings } from '../../models/settings';

/** The settings provider to use. (Default: `localStorage`) */
export const SETTINGS_PROVIDER: InjectionToken<Storage> = new InjectionToken('Settings storage provider', {
  factory: () => localStorage
});

/** The settings key to store the settings in. (Default: `settings`) */
export const SETTINGS_KEY: InjectionToken<string> = new InjectionToken('Settings storage key', {
  factory: () => 'settings'
});

@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService<S = Settings> {

  constructor(
    @Inject(SETTINGS_PROVIDER) private storage: Storage,
    @Inject(SETTINGS_KEY) private key: string
  ) { }

  /** Retrieves the current settings (as JSON). */
  get settings(): S {
    return JSON.parse(this.storage.getItem(this.key)) as S;
  }

  /** Overrides the current settings. */
  setSettings(settings: S) {
    this.storage.setItem(this.key, JSON.stringify(settings));
  }

  /** Clears the current settings. */
  clearSettings() {
    this.storage.removeItem(this.key);
  }
}
