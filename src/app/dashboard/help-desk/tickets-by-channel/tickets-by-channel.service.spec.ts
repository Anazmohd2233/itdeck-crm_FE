import { TestBed } from '@angular/core/testing';

import { TicketsByChannelService } from './tickets-by-channel.service';

describe('TicketsByChannelService', () => {
  let service: TicketsByChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsByChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
