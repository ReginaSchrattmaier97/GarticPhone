import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { CreateUser } from 'src/app/shared/create-user';
import {AuthenticationService} from '../../../../app/services/authentication/authentication.service';
import {Avatar} from '../../../../app/shared/types/avatar'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user = CreateUser.empty();

  avatars: Avatar[] = [
    {value: '../../../../assets/avatars/001-scientist.svg', viewValue: 'Scientist'},
    {value: '../../../../assets/avatars/002-werewolf.svg', viewValue: 'Werewolf'},
    {value: '../../../../assets/avatars/006-unicorn.svg', viewValue: 'Unicorn'}
  ];

  constructor(private form: FormBuilder, private router: Router,
              private authService: AuthenticationService) {
  }


  ngOnInit() {
    this.registerForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      avatar: ['', Validators.required]
    });

  }

  signUpUser(event) {
    event.preventDefault();
    const logInData = this.registerForm.value;
    this.authService.SignUp(logInData.email, logInData.password);
  }

}
