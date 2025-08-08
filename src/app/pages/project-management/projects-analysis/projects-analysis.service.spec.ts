import { TestBed } from '@angular/core/testing';

import { ProjectsAnalysisService } from './projects-analysis.service';

describe('ProjectsAnalysisService', () => {
  let service: ProjectsAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
