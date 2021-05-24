import { Round } from './Round';

export class Game {
  constructor(
    public id: string,
    public gameStarted: boolean,
    public rounds: Round[]
  ) {}
}
