import { TestBed } from '@angular/core/testing';

import { CustomerSatisfactionService } from './customer-satisfaction.service';

describe('CustomerSatisfactionService', () => {
  let service: CustomerSatisfactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSatisfactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
