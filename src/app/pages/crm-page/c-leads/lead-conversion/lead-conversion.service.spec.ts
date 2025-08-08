import { TestBed } from '@angular/core/testing';

import { LeadConversionService } from './lead-conversion.service';

describe('LeadConversionService', () => {
  let service: LeadConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
