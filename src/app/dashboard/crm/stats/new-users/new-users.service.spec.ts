import { TestBed } from '@angular/core/testing';

import { NewUsersService } from './new-users.service';

describe('NewUsersService', () => {
  let service: NewUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
