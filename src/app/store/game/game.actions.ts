import { Game } from "src/app/shared/types/game";


export class CreateGame {
  static readonly type = '[Game] CreateGame';
  constructor(public readonly payload: Game){}
}

export class StartGame {
  static readonly type = '[Game] StartGame';
}


export class FinishGame {
  static readonly type = '[Game] FinischGame';
}
