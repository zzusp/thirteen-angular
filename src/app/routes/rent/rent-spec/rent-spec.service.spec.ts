import { TestBed } from '@angular/core/testing';

import { RentSpecService } from './rent-spec.service';

describe('RentSpecService', () => {
  let service: RentSpecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentSpecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
