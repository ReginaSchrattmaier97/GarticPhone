import { Inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';

import { ActivatedRoute, Router } from '@angular/router';
import * as gameActions from './game.actions';
import { CreateGameService } from 'src/app/services/create-game/create-game.service';
import { DatabaseService } from 'src/app/services/database/database.service';




export interface GamesStateModel {
  created: boolean;
  started: boolean;
  finished: boolean;
  drawingstate: boolean;
  textstate:boolean;
}

@State<GamesStateModel>({
  name: 'gamestate',
  defaults: {
    drawingstate: false,
    textstate: true,
    created:false,
    started:false,
    finished:false
}
})

@Injectable()

export class GameState {
  constructor(
    private cgService: CreateGameService,
    private dbService: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ){

  }

public gamecode = this.activatedRoute.snapshot.params.id;


@Action( gameActions.CreateGame)
createGame({ patchState }: StateContext<GamesStateModel>) {
  patchState({ created: true });
  this.cgService.createGame();
}


@Action( gameActions.StartGame)
startGame({ patchState }: StateContext<GamesStateModel>) {
  patchState({ started: true });
  this.dbService.updateGameStatus(this.gamecode);
}



@Action(gameActions.FinishGame)
finishGame({ patchState }: StateContext<GamesStateModel>){
  patchState({ finished: true });
}


@Action(gameActions.TextRound)
textRound({ patchState }: StateContext<GamesStateModel>){
  patchState({
    drawingstate:true,
    textstate: true
  });
}


@Action(gameActions.DrawingRound)
drawingRound({ patchState }: StateContext<GamesStateModel>){
  patchState({
    textstate: false,
    drawingstate: true
  });
}

}

