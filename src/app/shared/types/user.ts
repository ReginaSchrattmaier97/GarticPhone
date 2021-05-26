export class User{
  constructor(
  public id: string,
  public firstName: string,
  public lastName:string,
  public imageUrl: string,
  public album?: [string]
  )
  {

  }
}
