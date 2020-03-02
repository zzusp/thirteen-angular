import { TestBed } from '@angular/core/testing';

import { BizTypeService } from './biz-type.service';

describe('BizTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BizTypeService = TestBed.get(BizTypeService);
    expect(service).toBeTruthy();
  });
});
