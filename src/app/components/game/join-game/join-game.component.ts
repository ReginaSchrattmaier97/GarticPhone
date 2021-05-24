import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent implements OnInit {
  currentUserId;
  @Output() userJoinedEvent = new EventEmitter<any>();

  constructor(
    private dbService: DatabaseService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  async getGameId(gamecode) {
    const userFirebase = await this.authService.isLoggedIn();
    let id = '';
    if (userFirebase) {
      id = userFirebase.uid;
      this.currentUserId = id.toString();
      this.dbService.addUserToGameById(this.currentUserId, gamecode);
      this.userJoinedEvent.emit(this.userJoinedFunc());
    } else {
      console.log('No current user available');
    }
  }

  userJoinedFunc() {
    console.log(this.currentUserId + 'joined');
    let x = 'joined';
    return x;
  }
}
