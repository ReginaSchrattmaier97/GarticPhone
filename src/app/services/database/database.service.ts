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
  joinedUser: User;

  constructor(public db: AngularFireDatabase, private router: Router) {}

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

  // public getUserById(userid: String) {
  //   const itemRef = this.db
  //     .list('/users/' + userid)
  //     .snapshotChanges()
  //     .forEach((userSnapshot) => {
  //       this.userList = [];
  //       userSnapshot.forEach((userSnapshot) => {
  //         let user = userSnapshot.payload.toJSON();
  //         this.userList.push(user as User);
  //         console.log('user' + user);
  //         return user;
  //       });
  //     });
  // }

  public getUserById(userid: String) {
    let userProperties;
    let user:User
    const itemRef = this.db
      .list('/users/' + userid)
      .snapshotChanges();
       return itemRef;
  }

  public saveImagesToRound(
    gameid: String,
    authorId: String,
    drawingRound: DrawingRound,
    userId: string
  ) {
    const itemRef = this.db.list(
      '/games/' + gameid + '/rounds/' + authorId
    );
    return itemRef
      .set(userId, drawingRound)
      .then(() => {
        console.log('saved drawing Round');
      })
      .catch((error) => {
        console.error(error + 'no drawing saved');
      });
  }

  public saveTextsToRound(
    gameid: String,
    authorId: String,
    textRound: TextRound,
    userId: string
  ) {
    const itemRef = this.db.list(
      '/games/' + gameid + '/rounds/' + authorId
    );

    return itemRef
      .set(userId, textRound)
      .then(() => {
        console.log('saved Text Round');
      })
      .catch((error) => {
        console.error(error + 'no text saved');
      });
  }

  public getTextsofRound(
    gameid: String,
    authorId: String
  ): Promise<Array<TextRound>> {
    const itemRef = this.db
      .list('/games/' + gameid + '/rounds/' + authorId )
      .snapshotChanges()
      .forEach((textSnapshot) => {
        this.textList = [];
        textSnapshot.forEach((textSnapshot) => {
          let text = textSnapshot.payload.toJSON();
          console.log('text');
          console.log(text);
          this.textList.push(text);
        });
        console.log(this.textList);
        return this.textList;
      });
    console.log(this.textList);
    return this.textList;
  }

  public getImagesofRound(gameid: String, authorId: number) {
    const itemRef = this.db
      .list('/games/' + gameid + '/rounds/' + authorId + '/drawingRounds/')
      .snapshotChanges()
      .forEach((drawingSnapshot) => {
        this.drawingList = [];
        drawingSnapshot.forEach((drawingSnapshot) => {
          let drawing = drawingSnapshot.payload.toJSON();
          this.drawingList.push(drawing);
        });
        return this.drawingList;
      });
    return this.drawingList;
  }

  public updateGameStatus(gameid: String) {
    const itemRef = this.db.object('/games/' + gameid);
    return itemRef
      .update({ gameStarted: true })
      .then(() => {
        console.log('created new Game');
      })
      .catch((error) => {
        console.error(error + 'no game created');
      });
  }


  public saveInputsInAlbumOfUser(input:String, authorId:String){
    const itemRef = this.db.object('/users/' + authorId + '/album/');
    return itemRef
      .set(input)
      .then(() => {
        console.log('created new Game');
      })
      .catch((error) => {
        console.error(error + 'no game created');
      });

  }


  public addGameMasterToGame(gameid: String): Promise<void> {
    const itemRef = this.db.object('/games/' + gameid + '/users/' + gameid);
    return itemRef
      .set(gameid)
      .then(() => {
        console.log('game master added');
      })
      .catch((error) => {
        console.error(error + 'no game master added');
      });
  }

  //TODO
  //--update TextRound --> update field assigned to user
  //--update ImageRound --> update field assigned to user
}
