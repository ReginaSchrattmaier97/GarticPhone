import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoinedUsersService } from 'src/app/services/joined-users/joined-users.service';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-wait-for-game',
  templateUrl: './wait-for-game.component.html',
  styleUrls: ['./wait-for-game.component.scss'],
})
export class WaitForGameComponent implements OnInit {
  gamecode: string;
  joinedUsers: [User];

  constructor(
    private juService: JoinedUsersService,
    private router: ActivatedRoute
  ) {
    this.gamecode = this.router.snapshot.params.id;
    console.log(this.gamecode);
  }

  ngOnInit(): void {
    this.joinedUsers = this.juService.getJoinedUsers(this.gamecode);
    console.log(this.joinedUsers);
  }
}
