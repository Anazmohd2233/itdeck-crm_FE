import { TestBed } from '@angular/core/testing';

import { TicketsByTypeService } from './tickets-by-type.service';

describe('TicketsByTypeService', () => {
  let service: TicketsByTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsByTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
