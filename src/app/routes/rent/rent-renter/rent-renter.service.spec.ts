import { TestBed } from '@angular/core/testing';

import { RentRenterService } from './rent-renter.service';

describe('RentRenterService', () => {
  let service: RentRenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentRenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
