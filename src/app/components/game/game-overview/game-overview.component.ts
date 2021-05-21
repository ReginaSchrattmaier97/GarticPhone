import { Component, OnInit } from '@angular/core';
import { CreateGameService } from 'src/app/services/create-game/create-game.service';

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss']
})
export class GameOverviewComponent implements OnInit {

  constructor( private createGameService : CreateGameService) {


  }

  ngOnInit(): void {
  }

  createGame(){
    this.createGameService.createGame();
  }

}
