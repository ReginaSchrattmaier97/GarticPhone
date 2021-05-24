import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { User } from 'src/app/shared/types/user';

@Injectable({
  providedIn: 'root',
})
export class JoinedUsersService {
  constructor(
    private dbService: DatabaseService,
    private authService: AuthenticationService
  ) {}

  getJoinedUsers(gamecode) {
    return this.dbService.getUsersByGameId(gamecode);
  }

  usersUpdated(gamecode): Array<String> {
    this.dbService.db
      .list('/games/' + gamecode + '/users/')
      .valueChanges()
      .subscribe((userData) => {
        console.log(userData);
        return userData;
      });
    return ['test'];
  }
}
