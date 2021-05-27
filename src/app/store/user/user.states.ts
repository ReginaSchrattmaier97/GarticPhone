import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DatabaseService } from "src/app/services/database/database.service";
import * as userActions from './user.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { state } from "@angular/animations";
import { User } from "src/app/shared/types/user";
import { AddUserToGame } from "./user.actions";


export interface UserStateModel {
  users: User[];
  joined: boolean;
  // started: boolean;
  // finished: boolean;
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
      users: [],
      joined: false
  }
})

@Injectable()

export class GameState {
  constructor(
    private dbService: DatabaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){
  }

  public gamecode = this.activatedRoute.snapshot.params.id;


@Selector()
getJoinedUsers(state: UserStateModel) {
  console.log(state.users);
  return state.users;
}

@Action( userActions.AddUserToGame)
addUserToGame({ patchState, getState }: StateContext<UserStateModel>, { payload }:  AddUserToGame) {
  const state = getState();
  patchState({
      users: [...state.users, payload],
      joined:true
  });
  this.dbService.addUserToGameById(payload.id, this.gamecode);
  this.router.navigate([`/wait/${this.gamecode}`]);
}





}
