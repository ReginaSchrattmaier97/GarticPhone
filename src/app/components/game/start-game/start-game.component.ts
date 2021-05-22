import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JoinedUsersService } from 'src/app/services/joined-users/joined-users.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: JoinedUsersService
  ) {}

  ngOnInit(): void {
    //this.userService.getJoinedUsers();
  }

  routeToGame() {
    this.router.navigate(['gamescreen']);
  }
}
