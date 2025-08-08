import { TestBed } from '@angular/core/testing';

import { TicketsSolvedAndCreatedService } from './tickets-solved-and-created.service';

describe('TicketsSolvedAndCreatedService', () => {
  let service: TicketsSolvedAndCreatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsSolvedAndCreatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
