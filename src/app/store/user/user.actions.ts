import { User } from "src/app/shared/types/user";

export class CreateUser{
  static readonly type = '[User] CreateUser';
}

export class AddUserToGame{
  static readonly type = '[User] AddUserToGame';
  constructor(public readonly payload: String, public readonly gamecode: String, public readonly user: User ){}
}

