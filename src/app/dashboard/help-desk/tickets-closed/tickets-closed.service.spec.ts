import { TestBed } from '@angular/core/testing';

import { TicketsClosedService } from './tickets-closed.service';

describe('TicketsClosedService', () => {
  let service: TicketsClosedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsClosedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
