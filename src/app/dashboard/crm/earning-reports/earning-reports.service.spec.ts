import { TestBed } from '@angular/core/testing';

import { EarningReportsService } from './earning-reports.service';

describe('EarningReportsService', () => {
  let service: EarningReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EarningReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
