import { TestBed } from '@angular/core/testing';

import { TicketsResolvedService } from './tickets-resolved.service';

describe('TicketsResolvedService', () => {
  let service: TicketsResolvedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsResolvedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
