import { TestBed } from '@angular/core/testing';

import { CourseSalesService } from './course-sales.service';

describe('CourseSalesService', () => {
  let service: CourseSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
