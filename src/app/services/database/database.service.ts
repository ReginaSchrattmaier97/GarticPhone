import { AngularFireDatabase } from '@angular/fire/database';

import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/types/user';
import { Game } from 'src/app/shared/types/game';
import { RoundOfGame } from 'src/app/shared/types/round-of-game';
import { Router } from '@angular/router';
import { TextRound } from 'src/app/shared/types/textRound';
import { DrawingRound } from 'src/app/shared/types/drawingRound';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public userList;
  public textList;
  public drawingList;

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

  public saveImagesToRound(gameid: String, roundCounter: number, drawingRound: DrawingRound){
    const itemRef = this.db.object('/games/' + gameid + '/rounds/' + roundCounter + '/drawingRounds/');
    return itemRef.set(drawingRound)
      .then(() => {
        console.log('saved drawing Round');
      })
      .catch((error) => {
        console.error(error + 'no drawing saved');
      });
  }

  public saveTextsToRound(gameid: String, roundCounter: number, textRound: TextRound){
    const itemRef = this.db.object('/games/' + gameid + '/rounds/' + roundCounter + '/textRounds/');
    return itemRef.set(textRound)
      .then(() => {
        console.log('saved Text Round');
      })
      .catch((error) => {
        console.error(error + 'no text saved');
      });

  }

  public getTextsofRound(gameid: String, roundCounter: number){
    const itemRef = this.db
    .list('/games/' + gameid + '/rounds/' + roundCounter + '/textRounds/')
    .snapshotChanges()
    .forEach((textSnapshot) => {
      this.textList = [];
      textSnapshot.forEach((textSnapshot) => {
        let text= textSnapshot.payload.toJSON();
        this.textList.push(text);
      });
      return this.textList;
    });
  return this.textList;
}


public getImagesofRound(gameid: String, roundCounter: number){
  const itemRef = this.db
  .list('/games/' + gameid + '/rounds/' + roundCounter + '/drawingRounds/')
  .snapshotChanges()
  .forEach((drawingSnapshot) => {
    this.drawingList = [];
    drawingSnapshot.forEach((drawingSnapshot) => {
      let drawing= drawingSnapshot.payload.toJSON();
      this.drawingList.push(drawing);
    });
    return this.drawingList;
  });
return this.drawingList;
}


//TODO
//--update TextRound --> update field assigned to user
//--update ImageRound --> update field assigned to user





}
