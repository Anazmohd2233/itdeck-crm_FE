import { TestBed } from '@angular/core/testing';

import { TasksStatsService } from './tasks-stats.service';

describe('TasksStatsService', () => {
  let service: TasksStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
