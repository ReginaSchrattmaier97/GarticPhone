import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { DatabaseService } from "src/app/services/database/database.service";
import * as userActions from './user.actions';
import { ActivatedRoute, Router } from '@angular/router';


export interface UserStateModel {
  joined: boolean;
  started: boolean;
  finished: boolean;
}

@State<UserStateModel>({
  name: 'userstate'
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


@Action( userActions.JoinGame)
joinGame({ patchState }: StateContext<UserStateModel>) {
  patchState({ joined: true });
  //TODO Use payload load instead of local storage
  this.dbService.addUserToGameById(localStorage.getItem('currentUserId'), this.gamecode);
  this.router.navigate([`/wait/${this.gamecode}`]);
}

}
