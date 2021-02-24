import { TestBed } from '@angular/core/testing';

import { RentItemService } from './rent-item.service';

describe('RentItemService', () => {
  let service: RentItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
