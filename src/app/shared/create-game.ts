import { Game } from "./types/game";

export class CreateGame {

  static empty():Game{
      return new Game("",[]);
  }

  }
