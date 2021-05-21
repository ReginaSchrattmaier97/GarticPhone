import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToGame(){
    this.router.navigate(['gamescreen']);
  }

}
