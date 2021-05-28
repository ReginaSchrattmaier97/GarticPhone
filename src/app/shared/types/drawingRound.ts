import { Round } from './Round';

export class DrawingRound implements Round {
  constructor(
    public authorId: string,
    public userId: string,
    public img: string,
    public data?: string
  ) {}
}
