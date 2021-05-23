import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { DatabaseService } from '../database/database.service';
import { CreateGame } from '../../shared/create-game';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateGameService {

  private administrator;
  public game = CreateGame.empty();

  constructor(private dbService: DatabaseService, private authService: AuthenticationService, private router: Router) { }

  async createGame(){
    this.administrator = await this.authService.isLoggedIn();
    if(this.administrator){
      this.game.id = this.administrator.uid;
      this.dbService.createGame(this.game);
      this.router.navigate([`/start/${this.game.id}`]);
    }
  }
}
