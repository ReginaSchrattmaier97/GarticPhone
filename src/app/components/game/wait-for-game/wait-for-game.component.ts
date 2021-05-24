import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoinedUsersService } from 'src/app/services/joined-users/joined-users.service';
import { User } from 'src/app/shared/types/user';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-wait-for-game',
  templateUrl: './wait-for-game.component.html',
  styleUrls: ['./wait-for-game.component.scss'],
})
export class WaitForGameComponent implements OnInit {
  gamecode: string;
  joinedUsers;
  test = '';
  allUsersInGame;
  @Output() userJoined = new EventEmitter<any>();

  constructor(
    private juService: JoinedUsersService,
    private router: ActivatedRoute,
    private dbService: DatabaseService
  ) {
    this.gamecode = this.router.snapshot.params.id;
    console.log(this.gamecode);
  }

  ngOnInit(): void {
    this.dbService.db
      .list('/games/' + this.gamecode + '/users/')
      .valueChanges()
      .subscribe((userData) => {
        console.log(userData);
        this.joinedUsers = userData;
        // for (let user of userData) {
        //   console.log('gggg' + user);
        //   this.allUsersInGame.push(this.dbService.getUserById(user.toString()));
        // }
      });
  }

  ngAfterViewInit(): void {}
}
