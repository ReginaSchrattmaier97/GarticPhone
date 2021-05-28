import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUserId = '';
  userImage;
  userName;
  constructor(
    private authService: AuthenticationService,
    private dbService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('currentUserId');
    this.dbService.getUserById(this.currentUserId).subscribe((userData) => {
      this.userImage = userData[0].payload.toJSON().toString();
      this.userName = userData[2].payload.toJSON().toString();
    });
  }

  Logout() {
    this.authService.SignOut();
    localStorage.removeItem('currentUserId');
  }
}
