import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddUserToGame } from 'src/app/store/user/user.actions';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent implements OnInit {
  currentUserId;
  loggedIn: boolean = false;
  user: User;
  @Output() userJoinedEvent = new EventEmitter<any>();

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('currentUserId');
    if (this.currentUserId) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  joinGame(gamecode) {
    this.store.dispatch(new AddUserToGame(this.currentUserId, gamecode));
  }

  logIn() {
    this.router.navigate(['/login']);
  }
}
