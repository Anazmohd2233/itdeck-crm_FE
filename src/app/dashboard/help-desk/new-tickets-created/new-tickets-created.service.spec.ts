import { TestBed } from '@angular/core/testing';

import { NewTicketsCreatedService } from './new-tickets-created.service';

describe('NewTicketsCreatedService', () => {
  let service: NewTicketsCreatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewTicketsCreatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
