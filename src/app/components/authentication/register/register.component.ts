import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private form: FormBuilder, private router: Router,
              private authService: AuthenticationService) {
  }


  ngOnInit() {
    this.registerForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signUpUser(event) {
    event.preventDefault();
    const logInData = this.registerForm.value;
    this.authService.SignUp(logInData.email, logInData.password);
  }

}
