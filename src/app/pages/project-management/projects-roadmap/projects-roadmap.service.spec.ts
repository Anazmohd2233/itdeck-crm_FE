import { TestBed } from '@angular/core/testing';

import { ProjectsRoadmapService } from './projects-roadmap.service';

describe('ProjectsRoadmapService', () => {
  let service: ProjectsRoadmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsRoadmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
