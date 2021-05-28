import { Game } from "src/app/shared/types/game";


export class CreateGame {
  static readonly type = '[Game] CreateGame';
  constructor(public readonly payload: String){}
}

export class StartGame {
  static readonly type = '[Game] StartGame';
}


export class FinishGame {
  static readonly type = '[Game] FinishGame';
}

export class TextRoundState {
  static readonly type = '[Game] TextRound';
  constructor(public readonly payload: String){}
}

export class DrawingRoundState {
  static readonly type = '[Game] DrawingRound';
  constructor(public readonly payload: String){}
}

export class StartFirstRound {
  static readonly type = '[Game] startFirstRound';
  constructor(public readonly payload: String){}
}
