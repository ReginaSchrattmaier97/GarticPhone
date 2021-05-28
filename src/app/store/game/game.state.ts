import { Inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';

import { ActivatedRoute, Router } from '@angular/router';
import * as gameActions from './game.actions';
import { CreateGameService } from 'src/app/services/create-game/create-game.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { DrawingRoundState, StartFirstRound, TextRoundState } from "./game.actions";




export interface GamesStateModel {
  created: boolean;
  started: boolean;
  finished: boolean;
  drawingstate: boolean;
  textstate:boolean;
  inputText: String;
  inputImage: String;
  startText: String;
  //roundNumber: number;
  //firstRound: boolean;
}

@State<GamesStateModel>({
  name: 'gamestate',
  defaults: {
    drawingstate: false,
    textstate: true,
    created:false,
    started:false,
    finished:false,
    inputText: '',
    inputImage:'',
    startText:'User added no start text',
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



@Selector()
  static isDrawingRound(state: GamesStateModel) {
    return state.drawingstate;
  }


  @Selector()
  static isTextRound(state: GamesStateModel) {
    return state.textstate;
  }


@Action( gameActions.CreateGame)
createGame({ patchState }: StateContext<GamesStateModel>) {
  patchState({ created: true });
  this.cgService.createGame();
}


@Action( gameActions.StartGame)
startGame({ patchState }: StateContext<GamesStateModel>) {
  patchState({ started: true });
}



@Action(gameActions.FinishGame)
finishGame({ patchState }: StateContext<GamesStateModel>){
  patchState({ finished: true });
}


@Action(gameActions.TextRoundState)
textRound({ patchState }: StateContext<GamesStateModel>,  { payload }:TextRoundState){
  patchState({
    drawingstate:false,
    textstate: true,
    inputText: payload,
  });
}


@Action(gameActions.DrawingRoundState)
drawingRound({ patchState }: StateContext<GamesStateModel>, { payload }:DrawingRoundState ){
  patchState({
    textstate: false,
    drawingstate: true,
    inputImage: payload,
  });
}

 @Action(gameActions.StartFirstRound)
  startFirstRound({ patchState }: StateContext<GamesStateModel>,  { payload }: StartFirstRound){
  patchState({
  startText: payload
  });


}


}

