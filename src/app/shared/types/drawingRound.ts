import {Round} from './Round';

export class DrawingRound implements Round {
  constructor(
    public userId: string,
    public img: string,
    public data?:string,
    //TODO add field assigned: boolean
    )
  {


  }

}
