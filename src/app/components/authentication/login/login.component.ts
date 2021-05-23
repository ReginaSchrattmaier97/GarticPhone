import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private form: FormBuilder, private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
      this.loginForm = this.form.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
      });
  }

  signInUser(event){
      event.preventDefault();
      const logInData = this.loginForm.value;
      this.authService.SignIn(logInData.email, logInData.password);
      this.saveCurrentUser();

  }

  async saveCurrentUser(){
    let currentUser = await this.authService.isLoggedIn();
    let currentUserID = currentUser.uid;
    console.log(currentUserID);
    localStorage.setItem('currentUserId', currentUserID);
  }

}
