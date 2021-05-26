import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateGameService } from 'src/app/services/create-game/create-game.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('currentUserId');
    if (this.currentUserId) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  createGame() {
    let id = this.createGameService.createGame();
  }

  joinGame() {
    this.router.navigate(['/join']);
  }

  logIn() {
    this.router.navigate(['/login']);
  }
}
