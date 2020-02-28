import { TestBed } from '@angular/core/testing';

import { LogLoginService } from './log-login.service';

describe('LogLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogLoginService = TestBed.get(LogLoginService);
    expect(service).toBeTruthy();
  });
});
