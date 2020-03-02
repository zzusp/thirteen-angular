import { TestBed } from '@angular/core/testing';

import { DeptService } from './dept.service';

describe('DeptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeptService = TestBed.get(DeptService);
    expect(service).toBeTruthy();
  });
});
