import { User } from "src/app/shared/types/user";

export class JoinGame {
  static readonly type = '[User] JoinGame';
  constructor(public readonly payload: String){}
}
