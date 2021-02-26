import { TestBed } from '@angular/core/testing';

import { RentContractService } from './rent-contract.service';

describe('RentContractService', () => {
  let service: RentContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
