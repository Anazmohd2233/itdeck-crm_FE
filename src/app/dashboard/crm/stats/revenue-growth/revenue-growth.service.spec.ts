import { TestBed } from '@angular/core/testing';

import { RevenueGrowthService } from './revenue-growth.service';

describe('RevenueGrowthService', () => {
  let service: RevenueGrowthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevenueGrowthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
