import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class CreateGameService {

  private administrator;

  constructor(private dbService: DatabaseService, private authService: AuthenticationService) { }

  createGame(game){
    this.administrator = this.authService.isLoggedIn;
    if(this.administrator){
      this.dbService.createGame(game);
    }
  }


}
