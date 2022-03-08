import { Injectable, Inject, InjectionToken, Optional } from '@angular/core';
import { Settings } from '../../models/settings';

/** Configuration options for {@link SettingsStorageService}. */
export interface SettingsStorageConfig<S = Settings> {
  /** Whether to revert to the default settings if no such value exists in storage. */
  canRevertDefault?: boolean;
  /** Default settings to be used if no such value exists in storage. */
  defaultSettings?: S;
}

/** The settings storage provider to use. (Default: `localStorage`) */
export const SETTINGS_STORAGE_PROVIDER: InjectionToken<Storage> = new InjectionToken('Settings storage provider', {
  factory: () => localStorage
});

/** The settings key to store the settings in. (Default: `settings`) */
export const SETTINGS_STORAGE_KEY: InjectionToken<string> = new InjectionToken('Settings storage key', {
  factory: () => 'settings'
});

export const SETTINGS_STORAGE_DEFAULT_CONFIG_FACTORY: () => SettingsStorageConfig
  = () => ({
    canRevertDefault: true,
    defaultSettings: {
      openNewTab: true,
      showImages: true,
      theme: 'indigo-pink',
      notifyNewReleases: true
    }
  });

/** Configuration options to change the behavior of {@link SettingsStorageService}. */
export const SETTINGS_STORAGE_CONFIG: InjectionToken<SettingsStorageConfig> = new InjectionToken('Settings storage config', {
  factory: SETTINGS_STORAGE_DEFAULT_CONFIG_FACTORY
});

@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService<S = Settings> {
  constructor(
    @Inject(SETTINGS_STORAGE_PROVIDER) private storage: Storage,
    @Inject(SETTINGS_STORAGE_KEY) private key: string,
    @Inject(SETTINGS_STORAGE_CONFIG) @Optional() private config: SettingsStorageConfig<S>
  ) { }

  /** Retrieves the current settings (as JSON). */
  get settings(): S {
    return (this.storage.getItem(this.key) && this.config.canRevertDefault) ?
      JSON.parse(this.storage.getItem(this.key)) as S : this.config.defaultSettings;
  }

  /** Overrides the current settings. */
  setSettings(settings: S) {
    this.storage.setItem(this.key, JSON.stringify(settings));
  }

  /**
   * Clears the current settings.
   *
   * @param resetToDefault Whether to reset to the default settings
   * instead of clearing them. (Default: `true`)
   */
  clearSettings(resetToDefault: boolean = true) {
    if (resetToDefault) {
      this.setSettings(this.config.defaultSettings);
    } else {
      this.storage.removeItem(this.key);
    }
  }
}
