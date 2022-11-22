import { TestBed } from '@angular/core/testing';
import { MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DialogsModule } from './dialogs.module';
import { DialogsService } from './dialogs.service';

describe('DialogsService', () => {
  let service: DialogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        DialogsModule
      ]
    }).compileComponents();
    service = TestBed.inject(DialogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#createOrGetDialogConfig', () => {
    it('should return the specified dialog config', () => {
      const config = new MatDialogConfig();
      config.id = 'testing-dialog-id';

      expect(service['createOrGetDialogConfig'](config))
        .toEqual(config);
    });

    it('should return a new dialog config if no config is specified', () => {
      const config = new MatDialogConfig();

      expect(service['createOrGetDialogConfig']()).toEqual(config);
    });
  });

  xdescribe('#openAlertDialog', () => {
  });
});
