import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinedUsersService } from 'src/app/services/joined-users/joined-users.service';
import { User } from 'src/app/shared/types/user';
import { DatabaseService } from 'src/app/services/database/database.service';
import { R3UsedDirectiveMetadata } from '@angular/compiler';

@Component({
  selector: 'app-wait-for-game',
  templateUrl: './wait-for-game.component.html',
  styleUrls: ['./wait-for-game.component.scss'],
})
export class WaitForGameComponent implements OnInit {
  gamecode: string;
  joinedUsers;
  gameStarted;
  allUsersInGame: Array<any>;

  @Output() userJoined = new EventEmitter<any>();

  constructor(
    private juService: JoinedUsersService,
    private router: ActivatedRoute,
    private dbService: DatabaseService,
    private router1: Router
  ) {
    this.gamecode = this.router.snapshot.params.id;
    this.allUsersInGame = [''];
  }

  ngOnInit(): void {
    this.dbService.db
      .list('/games/' + this.gamecode + '/users/')
      .valueChanges()
      .subscribe((userData) => {
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
    this.dbService.db
      .object('/games/' + this.gamecode + '/gameStarted/')
      .valueChanges()
      .subscribe((gameStarted) => {
        if (gameStarted) {
          this.router1.navigate([`gamescreen/${this.gamecode}`]);
        }
      });
  }
}
