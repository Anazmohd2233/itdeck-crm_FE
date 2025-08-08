import { TestBed } from '@angular/core/testing';

import { ProjectsProgressService } from './projects-progress.service';

describe('ProjectsProgressService', () => {
  let service: ProjectsProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
