import { TestBed } from '@angular/core/testing';

import { NewLeadsService } from './new-leads.service';

describe('NewLeadsService', () => {
  let service: NewLeadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewLeadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
