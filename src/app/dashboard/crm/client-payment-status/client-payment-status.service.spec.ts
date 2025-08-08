import { TestBed } from '@angular/core/testing';

import { ClientPaymentStatusService } from './client-payment-status.service';

describe('ClientPaymentStatusService', () => {
  let service: ClientPaymentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientPaymentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
