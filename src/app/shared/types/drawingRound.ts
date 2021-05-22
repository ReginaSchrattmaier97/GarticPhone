import {Round} from './Round';

export class DrawingRound implements Round {
  constructor(
    public userId: string,
    public img: string
    )
  {


  }

}
