import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateGameService } from 'src/app/services/create-game/create-game.service';

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss']
})
export class GameOverviewComponent implements OnInit {

  constructor( private createGameService : CreateGameService, private router: Router) {


  }

  ngOnInit(): void {
  }

  createGame(){
    let id = this.createGameService.createGame();
  }

}
