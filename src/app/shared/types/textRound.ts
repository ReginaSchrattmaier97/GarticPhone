import {Round} from './Round';

export class TextRound implements Round {

  constructor(
    public userId: string,
    public text: string,
    public data?: string
    //TODO add field assigned: boolean
    )
  {


  }
}
