import {Round} from './Round';

export class DrawingRound implements Round {
  constructor(
    public userId: string,
    public img: string,
    public data?:string,
    public authorId?:string
    //TODO add field assigned: boolean
    )
  {


  }

}
