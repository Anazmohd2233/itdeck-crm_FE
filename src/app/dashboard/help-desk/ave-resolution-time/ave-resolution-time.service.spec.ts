import { TestBed } from '@angular/core/testing';

import { AveResolutionTimeService } from './ave-resolution-time.service';

describe('AveResolutionTimeService', () => {
  let service: AveResolutionTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AveResolutionTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
