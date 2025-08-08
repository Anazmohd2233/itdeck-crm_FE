import { TestBed } from '@angular/core/testing';

import { MostLeadsService } from './most-leads.service';

describe('MostLeadsService', () => {
  let service: MostLeadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostLeadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
