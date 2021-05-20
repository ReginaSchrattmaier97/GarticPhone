import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(public firebaseAuth: AngularFireAuth, private router: Router) {
  }

  SignIn(email, password) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  SignUp(email, password) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
              return(
                  alert("email already in use")
              );
          case 'auth/invalid-email':
              return(
                  alert("invalid email")
              );
          case 'auth/weak-password':
              return(
                  alert("weak password")
              );
        }
      });
  }

  SignOut() {
    return this.firebaseAuth.signOut()
      .then(() => {
        this.router.navigate(['/authentication']);
      });
  }
}
