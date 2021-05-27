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

export class TextRound {
  static readonly type = '[Game] TextRound';
}

export class DrawingRound {
  static readonly type = '[Game] DrawingRound';
}
