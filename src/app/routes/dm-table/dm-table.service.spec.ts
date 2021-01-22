import { TestBed } from '@angular/core/testing';

import { DmTableService } from './dm-table.service';

describe('DmTableService', () => {
  let service: DmTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
