import { TestBed } from '@angular/core/testing';

import { TotalLeadsService } from './total-leads.service';

describe('TotalLeadsService', () => {
  let service: TotalLeadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalLeadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
