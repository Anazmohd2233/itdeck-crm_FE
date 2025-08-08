import { TestBed } from '@angular/core/testing';

import { ActiveUsersService } from './active-users.service';

describe('ActiveUsersService', () => {
  let service: ActiveUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
