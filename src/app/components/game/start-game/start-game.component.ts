import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinedUsersService } from 'src/app/services/joined-users/joined-users.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  public gamecode;

  constructor(
    private router: Router,
    private userService: JoinedUsersService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    //this.userService.getJoinedUsers();
    this.gamecode = this.activatedRoute.snapshot.params.id;
  }

  routeToGame() {
    this.router.navigate(['gamescreen']);
  }
}
