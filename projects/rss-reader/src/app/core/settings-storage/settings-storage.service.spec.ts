import { TestBed } from '@angular/core/testing';

// Internal app testing utils
import { MockStorage } from '../testing/utils/mock-storage';

// Models
import { Settings } from '../../models/settings';

// Classes to test
import {
  SettingsStorageConfig,
  SettingsStorageService,
  SETTINGS_STORAGE_CONFIG,
  SETTINGS_STORAGE_KEY,
  SETTINGS_STORAGE_PROVIDER
} from './settings-storage.service';


describe('SettingsStorageService', () => {
  let service: SettingsStorageService;
  const baseMockSettings: Settings = {
    showImages: true,
    theme: 'deeppurple-amber',
    maxNotifications: 102932
  };
  const baseMockStorage = new MockStorage({ settings: JSON.stringify(baseMockSettings) });

  const updateService = () => {
    service = TestBed.inject(SettingsStorageService);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsStorageService,
        { provide: SETTINGS_STORAGE_PROVIDER, useFactory: () => baseMockStorage }
      ]
    });
  });

  it('should create', () => {
    updateService();
    expect(service).toBeDefined();
  });

  describe('#settings', () => {
    it('should retrieve the current settings', () => {
      const mockSettings = JSON.stringify({ settingOne: 'string type', settingTwo: 10392 });
      const mockStorage = new MockStorage({ settings: mockSettings });

      TestBed.overrideProvider(SETTINGS_STORAGE_PROVIDER, {
        useFactory: () => mockStorage
      });
      updateService();

      expect(service.settings).toEqual(JSON.parse(mockStorage.getItem('settings')),
        'Expected settings to match that of the mock settings');
    });
  });

  describe('#setSettings', () => {
    it('should set the settings', () => {
      const mockSettings: Settings = { multipleRss: true, showImages: false };
      const mockStorage = new MockStorage();
      TestBed.overrideProvider(SETTINGS_STORAGE_PROVIDER, {
        useFactory: () => mockStorage
      });
      updateService();

      service.setSettings(mockSettings);
      expect(mockStorage.getItem('settings')).toBeDefined('Expected settings to be set');
      expect(JSON.parse(mockStorage.getItem('settings')))
        .toEqual(mockSettings, 'Expected settings to be updated');
    });
  });

  describe('#clearSettings', () => {
    it('should reset to default settings if no arguments are specified', () => {
      const mockStorage = new MockStorage({ settings: JSON.stringify(baseMockSettings) });
      const mockDefaultSettings: Settings = { openNewTab: false, theme: 'deeppurple-amber' };
      const customConfigFactory: () => SettingsStorageConfig = () => ({
        canRevertDefault: true,
        defaultSettings: mockDefaultSettings
      });

      TestBed.overrideProvider(SETTINGS_STORAGE_PROVIDER, {
        useFactory: () => mockStorage
      });
      TestBed.overrideProvider(SETTINGS_STORAGE_CONFIG, {
        useFactory: customConfigFactory
      });
      updateService();

      service.clearSettings();

      const settings = mockStorage.getItem('settings');
      expect(settings).toBeDefined('Expected settings key to not be deleted');
      expect(JSON.parse(settings))
        .toEqual(mockDefaultSettings, 'Expected settings to be reset to default');
      expect(JSON.parse(settings)).not
        .toEqual(baseMockSettings, 'Expected settings to not match the original settings');
    });

    it('should remove the settings if resetToDefault=false', () => {
      const mockStorage = new MockStorage({ settings: JSON.stringify(baseMockSettings) });

      TestBed.overrideProvider(SETTINGS_STORAGE_PROVIDER, {
        useFactory: () => mockStorage
      });
      updateService();

      service.clearSettings(/* resetToDefault = */ false);

      const settings = mockStorage.getItem('settings');
      expect(settings).toBeNull('Expected settings to be deleted');
    });
  });

  describe('storage config injection token', () => {
    it('should allow for a custom config to be specified', () => {
      const mockStorage = new MockStorage({ settings: JSON.stringify(baseMockSettings) });
      const defaultMockSettings: Settings = { maxNotifications: 1000, showOfflineSnackBar: true };

      const customConfigFactory: () => SettingsStorageConfig = () => ({
        canRevertDefault: false,
        defaultSettings: defaultMockSettings
      });

      TestBed.overrideProvider(SETTINGS_STORAGE_CONFIG, {
        useFactory: customConfigFactory
      });
      TestBed.overrideProvider(SETTINGS_STORAGE_PROVIDER, {
        useFactory: () => mockStorage
      });
      updateService();

      service.clearSettings(/* resetToDefault = */ true);
      expect(JSON.parse(mockStorage.getItem('settings'))).toEqual(defaultMockSettings,
        'Expected settings to be updated to the defaults');
    });
  });

  describe('storage provider injection token', () => {
    it('should allow for a custom storage provider to be specified', () => {
      const mockStorage = new MockStorage();
      TestBed.overrideProvider(SETTINGS_STORAGE_PROVIDER, {
        useFactory: () => mockStorage
      });
      updateService();

      const mockSettings: Settings = {
        maxNotifications: 1,
        notifications: false,
        openNewTab: true,
        pushNotifications: false
      };
      service.setSettings(mockSettings);

      expect(service.settings).toEqual(mockSettings,
        'Expected settings to match that of the mock settings');
      expect(JSON.parse(baseMockStorage.getItem('settings'))).not
        .toEqual(JSON.parse(mockStorage.getItem('settings')),
          'Expected the base settings to not match the current mock settings');
    });
  });

  describe('storage key injection token', () => {
    it('should allow for a custom key to be specified', () => {
      const mockStorage = new MockStorage({ settings: JSON.stringify(baseMockSettings) });
      TestBed.overrideProvider(SETTINGS_STORAGE_PROVIDER, {
        useFactory: () => mockStorage
      });
      TestBed.overrideProvider(SETTINGS_STORAGE_KEY, {
        useFactory: () => 'settingsTwo'
      });
      updateService();

      const mockSettings: Settings = {
        notifyNewReleases: true,
        pushNotifications: false
      };
      service.setSettings(mockSettings);

      expect(mockStorage.getItem('settingsTwo')).not
        .toBeNull('Expected a `settingsTwo` key to be defined');
      expect(service.settings).toEqual(mockSettings, 'Expected settings to be updated');
    });
  });
});
