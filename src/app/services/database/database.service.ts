import { AngularFireDatabase } from '@angular/fire/database';

import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/types/user';
import { Game } from 'src/app/shared/types/game';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {

  constructor(private db: AngularFireDatabase, private router: Router) {
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
      console.log('created new Game');
      this.router.navigate(['start']);
    })
    .catch((error) => {
      console.error(error + 'no game created');
    });
  }
}
