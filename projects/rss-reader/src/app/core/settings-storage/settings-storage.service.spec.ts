import { TestBed } from '@angular/core/testing';

import { SettingsStorageService } from './settings-storage.service';

describe('SettingsStorageService', () => {
  let service: SettingsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO
});
