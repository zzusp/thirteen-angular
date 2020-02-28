import { TestBed } from '@angular/core/testing';

import { AppModalService } from './app-model.service';

describe('AppModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppModalService = TestBed.get(AppModalService);
    expect(service).toBeTruthy();
  });
});
