import { TestBed } from '@angular/core/testing';

import { DictService } from './dict.service';

describe('DictService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DictService = TestBed.get(DictService);
    expect(service).toBeTruthy();
  });
});
