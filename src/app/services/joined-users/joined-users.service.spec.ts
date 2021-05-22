import { TestBed } from '@angular/core/testing';

import { JoinedUsersService } from './joined-users.service';

describe('JoinedUsersService', () => {
  let service: JoinedUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinedUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
