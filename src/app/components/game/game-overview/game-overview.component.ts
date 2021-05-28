import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateGameService } from 'src/app/services/create-game/create-game.service';
import { Select, Store } from '@ngxs/store';
import { CreateGame } from '../../../store/game/game.actions';
import { Game } from 'src/app/shared/types/game';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss'],
})
export class GameOverviewComponent implements OnInit {
  currentUserId;
  loggedIn: boolean = false;
  constructor(
    private createGameService: CreateGameService,
    private router: Router,
    private store: Store,
    private dbService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('currentUserId');
    if (this.currentUserId) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    this.dbService.getUserById(this.currentUserId);
  }

  createGame() {
    this.createGameService.createGame();
    //this.store.dispatch(new CreateGame(this.currentUserId));
    //this.dbService.createGame(this.currentUserId);
    this.dbService.addGameMasterToGame(this.currentUserId);
    this.router.navigate([`/start/${this.currentUserId}`]);
  }

  joinGame() {
    this.router.navigate(['/join']);
  }

  logIn() {
    this.router.navigate(['/login']);
  }
}
