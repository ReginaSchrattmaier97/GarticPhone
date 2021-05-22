import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DatabaseService } from '../database/database.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public firebaseUser;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private router: Router,
    private dbService: DatabaseService
  ) {
    this.firebaseAuth.authState.subscribe((authState) => {
      this.firebaseUser = authState;
    });
  }

  SignIn(email, password) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  isLoggedIn() {
    return this.firebaseAuth.authState.pipe(first()).toPromise();
  }

  SignUp(user) {
    console.log('in signuo service');
    return this.firebaseAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.saveUserInDB(user);
      })
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            return alert('email already in use');
          case 'auth/invalid-email':
            return alert('invalid email');
          case 'auth/weak-password':
            return alert('weak password');
        }
      });
  }

  SignOut() {
    return this.firebaseAuth.signOut().then(() => {
      this.router.navigate(['/authentication']);
    });
  }

  async getCurrentUserId() {
    const userFirebase = await this.isLoggedIn();
    let id = '';
    if (userFirebase) {
      id = userFirebase.uid;
      console.log(id.toString());
      return id.toString();
    } else {
      console.log('No current user available');
    }
  }

  async saveUserInDB(user) {
    const userFirebase = await this.isLoggedIn();
    if (userFirebase) {
      console.log('logged In');
      user.id = userFirebase.uid;
      console.log(user.id);

      this.dbService.saveUser(user);
      console.log('saved in db');
    } else {
      // do something else
    }
  }
}
