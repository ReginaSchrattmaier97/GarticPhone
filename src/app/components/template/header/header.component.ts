import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUserId = '';
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('currentUserId');
  }

  Logout() {
    this.authService.SignOut();
  }
}
