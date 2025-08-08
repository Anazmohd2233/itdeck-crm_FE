import { TestBed } from '@angular/core/testing';

import { FirstResponseTimeService } from './first-response-time.service';

describe('FirstResponseTimeService', () => {
  let service: FirstResponseTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstResponseTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
