import { AngularFireDatabase } from '@angular/fire/database';

import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/types/user';
import { Game } from 'src/app/shared/types/game';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public db;

  constructor(db: AngularFireDatabase) {
    this.db = db;
  }

  public saveUser(user: User): Promise<void> {
    console.log(user.id);
    const itemRef = this.db.object('/users/' + user.id);
    return itemRef.set(user)
      .then(() => {
        console.log('created new User');
      })
      .catch((error) => {
        console.error(error + 'no user created');
      });
  }

  public createGame(game: Game): Promise<void>{
    const itemRef = this.db.object('/games/' + game.id);
    return itemRef.set(game)
    .then(() => {
      console.log('created new User');
    })
    .catch((error) => {
      console.error(error + 'no user created');
    });
  }
}
