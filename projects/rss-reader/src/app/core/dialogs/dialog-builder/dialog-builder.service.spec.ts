import { TestBed } from '@angular/core/testing';

import { DialogBuilderService } from './dialog-builder.service';

xdescribe('DialogBuilderService', () => {
  let service: DialogBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
