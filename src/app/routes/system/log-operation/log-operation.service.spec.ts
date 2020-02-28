import { TestBed } from '@angular/core/testing';

import { LogOperationService } from './log-operation.service';

describe('LogOperationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogOperationService = TestBed.get(LogOperationService);
    expect(service).toBeTruthy();
  });
});
