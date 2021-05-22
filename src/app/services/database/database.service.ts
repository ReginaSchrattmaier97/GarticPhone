import { AngularFireDatabase } from '@angular/fire/database';

import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/types/user';
import { Game } from 'src/app/shared/types/game';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public userList;

  constructor(private db: AngularFireDatabase, private router: Router) {}

  public saveUser(user: User): Promise<void> {
    console.log(user.id);
    const itemRef = this.db.object('/users/' + user.id);
    return itemRef
      .set(user)
      .then(() => {
        console.log('created new User');
      })
      .catch((error) => {
        console.error(error + 'no user created');
      });
  }

  public createGame(game: Game): Promise<void> {
    const itemRef = this.db.object('/games/' + game.id);
    return itemRef
      .set(game)
      .then(() => {
        console.log('created new Game');
        this.router.navigate(['start']);
      })
      .catch((error) => {
        console.error(error + 'no game created');
      });
  }

  public addUserToGameById(userid: String, gameid: String): Promise<void> {
    const itemRef = this.db.object('/games/' + gameid + '/users/' + userid);

    return itemRef
      .set(userid)
      .then(() => {
        console.log('user added');
      })
      .catch((error) => {
        console.error(error + 'no user added');
      });
  }

  public getUsersByGameId(gameid: String) {
    const itemRef = this.db
      .list('/games/' + gameid + '/users/')
      .snapshotChanges()
      .forEach((userSnapshot) => {
        this.userList = [];
        userSnapshot.forEach((userSnapshot) => {
          let userId = userSnapshot.payload.toJSON();
          let user = this.getUserById(userId.toString());
          this.userList.push(user);
        });
        return this.userList;
      });
    return this.userList;
  }

  public getUserById(userid: String) {
    const itemRef = this.db
      .list('/users/' + userid)
      .snapshotChanges()
      .forEach((userSnapshot) => {
        this.userList = [];
        userSnapshot.forEach((userSnapshot) => {
          let user = userSnapshot.payload.toJSON();
          this.userList.push(user as User);
        });
      });
  }
}
