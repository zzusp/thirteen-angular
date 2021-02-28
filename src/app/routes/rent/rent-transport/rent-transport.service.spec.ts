import { TestBed } from '@angular/core/testing';

import { RentTransportService } from './rent-transport.service';

describe('RentTransportService', () => {
  let service: RentTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
