import { TestBed } from '@angular/core/testing';

import { TicketsInProgressService } from './tickets-in-progress.service';

describe('TicketsInProgressService', () => {
  let service: TicketsInProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsInProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
