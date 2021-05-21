import { Game } from "./types/game";

export class CreateUser {

  static empty():Game{
      return new Game("",[]);
  }
      static fromObject(rawUser:any) : Game{
      return new Game(
          rawUser.id,
          rawUser.rounds
      );
    }
  }
