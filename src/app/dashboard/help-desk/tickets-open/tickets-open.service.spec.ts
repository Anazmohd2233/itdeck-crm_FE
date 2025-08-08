import { TestBed } from '@angular/core/testing';

import { TicketsOpenService } from './tickets-open.service';

describe('TicketsOpenService', () => {
  let service: TicketsOpenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsOpenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
