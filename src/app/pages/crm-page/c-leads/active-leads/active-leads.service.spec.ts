import { TestBed } from '@angular/core/testing';

import { ActiveLeadsService } from './active-leads.service';

describe('ActiveLeadsService', () => {
  let service: ActiveLeadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveLeadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
