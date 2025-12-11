import { TestBed } from '@angular/core/testing';

import { TotalDataCollectedService } from './total-data.service';

describe('TotalDataCollectedService', () => {
  let service: TotalDataCollectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalDataCollectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
