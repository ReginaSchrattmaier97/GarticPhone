import { User } from "./types/user";

export class CreateUser {

  static empty():User{
      return new User("","","","");
  }
      static fromObject(rawUser:any) : User{
      return new User(
          rawUser.id,
          rawUser.firstName,
          rawUser.lastName,
          rawUser.imageUrl
      );
      }
  }
