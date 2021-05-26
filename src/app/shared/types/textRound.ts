import {Round} from './Round';

export class TextRound implements Round {

  constructor(
    public userId: string,
    public text: string,
    public data?: string,
    public authorId?:string
    //TODO add field assigned: boolean
    )
  {


  }
}
