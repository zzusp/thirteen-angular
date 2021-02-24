import { TestBed } from '@angular/core/testing';

import { RentCategoryService } from './rent-category.service';

describe('RentCategoryService', () => {
  let service: RentCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
