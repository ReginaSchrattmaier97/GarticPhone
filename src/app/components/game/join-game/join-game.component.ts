import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Output } from '@angular/core';
import { Observable } from 'rxjs';
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
  user:User;
  @Output() userJoinedEvent = new EventEmitter<any>();

  constructor(
    private dbService: DatabaseService,
    private router: Router,
    private authService: AuthenticationService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('currentUserId');
    if (this.currentUserId) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  joinGame(gamecode){
    this.store.dispatch(new AddUserToGame(this.currentUserId, gamecode, this.user));
  }

  // async getGameId(gamecode) {
  //   const userFirebase = await this.authService.isLoggedIn();
  //   let id = '';
  //   if (userFirebase) {
  //     id = userFirebase.uid;
  //     this.currentUserId = id.toString();
  //     this.dbService.addUserToGameById(this.currentUserId, gamecode);
  //     this.router.navigate([`/wait/${gamecode}`]);
  //     this.userJoinedEvent.emit(this.userJoinedFunc());
  //   } else {
  //     console.log('No current user available');
  //   }
  // }

  getUserById(gamecode) {

  }

  // userJoinedFunc() {
  //   console.log(this.currentUserId + 'joined');
  //   let x = 'joined';
  //   return x;
  // }

  logIn() {
    this.router.navigate(['/login']);
  }
}
