import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUserId = '';
  constructor() {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('currentUserId');
  }
}
