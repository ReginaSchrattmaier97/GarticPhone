import { Injectable } from "@angular/core";
import { Action, createSelector, Selector, State, StateContext } from "@ngxs/store";
import { DatabaseService } from "src/app/services/database/database.service";
import * as userActions from './user.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { state } from "@angular/animations";
import { User } from "src/app/shared/types/user";
import { AddUserToGame } from "./user.actions";


export interface UserStateModel {
  users: User[];
  //joined: boolean;
  // started: boolean;
  // finished: boolean;
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
      users: [],

  }
})

@Injectable()

export class UserState {
  joinedUsers1;
  joinedUser: User;
  allUsersInGame;

  constructor(
    private dbService: DatabaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){
  }



joinedUsers(gamecode:string){
  this.dbService.db
  .list('/games/' + gamecode + '/users/')
  .valueChanges()
  .subscribe((userData) => {
    console.log(userData);
    this.joinedUsers1 = userData;
    for (let i = 0; i < userData.length; i++) {
      this.dbService.db
        .list('/users/' + userData[i])
        .valueChanges()
        .subscribe((res) => {
          this.allUsersInGame.push(res);
        });
    }
  });
  return createSelector([UserState], (state: string[]) => {
    return this.allUsersInGame;
  });
}



// @Selector()
// getJoinedUsers(state: UserStateModel, gamecode) {
//   this.dbService.db
//   .list('/games/' + gamecode + '/users/')
//   .valueChanges()
//   .subscribe((userData) => {
//     console.log(userData);
//     this.joinedUsers = userData;
//     for (let i = 0; i < userData.length; i++) {
//       this.dbService.db
//         .list('/users/' + userData[i])
//         .valueChanges()
//         .subscribe((res) => {
//           this.allUsersInGame.push(res);
//         });
//     }
//   });
//   state.users = this.allUsersInGame;
//   return state.users;
// }

@Action( userActions.AddUserToGame)
addUserToGame({ patchState, getState }: StateContext<UserStateModel>, { payload, gamecode, user }:  AddUserToGame) {
  const state = getState();
  this.dbService.addUserToGameById(payload, gamecode);
  this.dbService.getUserById(payload).subscribe((userData) => {
    console.log(userData[0].payload.toJSON().toString());
    this.joinedUser.imageUrl = userData[0].payload.toJSON().toString();
    this.joinedUser.firstName= userData[2].payload.toJSON().toString();
    this.joinedUser.id= userData[3].payload.toJSON().toString();
    this.joinedUser.lastName= userData[4].payload.toJSON().toString();
    //return this.joinedUser;
    user=this.joinedUser;
    console.log(user);
});


  patchState({
      users: [...state.users, user],
  });

  this.router.navigate([`/wait/${gamecode}`]);
}





}
