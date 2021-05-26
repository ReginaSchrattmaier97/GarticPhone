import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinedUsersService } from 'src/app/services/joined-users/joined-users.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Store } from '@ngxs/store';
import { StartGame } from '../../../store/game/game.actions';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  public gamecode;
  joinedUsers;
  allUsersInGame: Array<any>;

  constructor(
    private router: Router,
    private userService: JoinedUsersService,
    private activatedRoute: ActivatedRoute,
    private dbService: DatabaseService,
    private store: Store
  ) {
    this.gamecode = this.activatedRoute.snapshot.params.id;
    this.allUsersInGame = [''];
  }

  ngOnInit(): void {
    this.gamecode = this.activatedRoute.snapshot.params.id;
    this.userService.getJoinedUsers(this.gamecode);
    this.dbService.db
      .list('/games/' + this.gamecode + '/users/')
      .valueChanges()
      .subscribe((userData) => {
        console.log(userData);
        this.joinedUsers = userData;
        for (let i = 0; i < userData.length; i++) {
          this.dbService.db
            .list('/users/' + userData[i])
            .valueChanges()
            .subscribe((res) => {
              this.allUsersInGame.push(res);
            });
        }
      });
  }

  startGame() {
    this.store.dispatch(new StartGame());
    this.router.navigate([`gamescreen/${this.gamecode}`]);
  }

  userJoinedGameFunc() {
    console.log('user joined here');
    let x = 'joinedx';
    return x;
  }
}
