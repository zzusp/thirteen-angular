import { TestBed } from '@angular/core/testing';

import { RentBaseInfoService } from './rent-base-info.service';

describe('RentBaseInfoService', () => {
  let service: RentBaseInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentBaseInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
