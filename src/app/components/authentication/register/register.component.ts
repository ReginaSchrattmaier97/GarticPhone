import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';
import { CreateUser } from 'src/app/shared/create-user';
import {AuthenticationService} from '../../../../app/services/authentication/authentication.service';
import {Avatar} from '../../../../app/shared/types/avatar'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public user = CreateUser.empty();

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
      firstName:['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      avatar: ['', Validators.required]
    });


  }

  signUpUser(event) {
    event.preventDefault();
    console.log("in signup user register compnent");
    this.user = this.registerForm.value;
    this.authService.SignUp(this.user);
  }

}
