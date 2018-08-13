import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';


import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';



import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { User } from 'src/app/components/shared/models/user.model';

@Injectable()
export class AuthService {
  token: string;
  user: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) { 

      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }),
        tap(user => localStorage.setItem('user', JSON.stringify(user))),
        startWith(JSON.parse(localStorage.getItem('user')))
      );

    }

    private oAuthLogin(provider: any) {
      return this.afAuth.auth
        .signInWithPopup(provider)
        .then(credential => {
          return this.updateUserData(this.userService.uid);
        })
        .catch(error => this.handleError(error));
    }
  

  // Signup/register
  signUpWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(response => {
        this.router.navigate(['/']);
        this.afAuth.auth.currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          );
        this.alertService.showToaster('O e-mail de verificação é enviado para você');
        this.userService.verificationUserEmail();
        this.userService.saveUserInfo(this.afAuth.auth.currentUser.uid, name, this.afAuth.auth.currentUser.email);
      }
      )
      .catch(
        error => console.error(error)
    );
  }

  signUpWithTwitter() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider)
      .then(response => {
        this.router.navigate(['/']);
        this.afAuth.auth.currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          );
        this.alertService.showToaster('Por favor, verifique sua caixa de entrada para um e-mail de verificação.');
        this.userService.verificationUserEmail();
        this.userService.saveUserInfo(this.afAuth.auth.currentUser.uid, name, this.afAuth.auth.currentUser.email);
      }
      )
      .catch(
        error => console.error(error)
      );
  }

  signUpWithFacebook() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider)
      .then(
        provider => {
          this.router.navigate(['/']);
          this.afAuth.auth.currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
          this.alertService.showToaster('O e-mail de verificação é enviado para você.');
          this.userService.verificationUserEmail();
          this.userService.saveUserInfo(this.afAuth.auth.currentUser.uid, name, this.afAuth.auth.currentUser.email);
        }
      )
      .catch(
        error => console.error(error)
      );
  }

  signUpWithGithub() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider)
      .then((provider) => {
        this.alertService.showToaster('O e-mail de verificação é enviado para você.');
        this.userService.verificationUserEmail();
        this.userService.saveUserInfo(this.afAuth.auth.currentUser.uid, name, this.afAuth.auth.currentUser.email);
      })
      .then(response => {
        this.router.navigate(['/']);
        this.afAuth.auth.currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          );
      }
      )
      .catch(
        error => console.error(error)
      );
  }

  signupUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.alertService.showToaster('O e-mail de verificação é enviado para você.');
        this.userService.verificationUserEmail();
        this.userService.saveUserInfo(this.afAuth.auth.currentUser.uid, name, email);
      }
      ).catch(
        error => console.error(error)
      );
  }

  // Signin/login
  signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(response => {
        this.router.navigate(['/']);
        this.afAuth.auth.currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          );
        this.alertService.showToaster('Google login com Sucesso');
      }
      )
      .catch(
        error => console.error(error)
      );
  }

  signInWithTwitter() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider)
      .then(response => {
        this.router.navigate(['/']);
        this.afAuth.auth.currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          );
        this.alertService.showToaster('Twitter login com Sucesso');
      }
      )
      .catch(
        error => console.error(error)
      );
  }

  signInWithFacebook() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider)
      .then(
        response => {
          this.router.navigate(['/']);
          this.afAuth.auth.currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
          this.alertService.showToaster('Facebook login com Sucesso');
        }
      )
      .catch(
        error => console.error(error)
      );
  }

  signInWithGithub() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider)
      .then(response => {
        this.router.navigate(['/']);
        this.afAuth.auth.currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          );
        this.alertService.showToaster('Github login com Sucesso');
      }
      )
      .catch(
        error => console.error(error)
      );
  }

  signinUser(email: string, password: string) {
    return  this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          // firebase.auth().currentUser.getToken()
          this.afAuth.auth.currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
          this.alertService.showToaster('Login com Sucesso');
        }
      )
      .catch(
        error => console.error(error)
      );
  }

  signInAnonymous() {
    return  this.afAuth.auth.signInAnonymously()
      .then(
        response => {
          this.router.navigate(['/']);
          this.afAuth.auth.onAuthStateChanged(currentUser => {
            const isAnonymous = currentUser.isAnonymous;
            const uid = currentUser.uid;
            this.afAuth.auth.currentUser.getIdToken()
              .then(
                (token: string) => this.token = token
              ),
              this.alertService.showToaster('Anonymous login com Sucesso');
            console.log(currentUser);
          });
        }
      )
      .catch(
        error => console.error(error)
      );
  }

  // Other
  logout() {
    return  this.afAuth.auth.signOut()
      .then(
        response => {
          this.router.navigate(['/home']);
          this.token = null;
        }
      )
      .catch(
        error => console.error(error)
      );
  }

  getIdToken() {
    this.afAuth.auth.currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

    // If error, console log and notify user
    private handleError(error: Error) {
      console.error(error);
     
    }
    // Sets user data to firestore after succesful login
    private updateUserData(user: User) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );
      const data: User = {
        uid: user.uid,
        firstName: user.firstName,
        lastName:user.lastName,
        fullName : user.fullName,
        bio:user.bio,
        password: user.password,
        providerId: user.providerId,
        idToken: user.idToken,
        photoUrl: user.photoUrl || 'https://goo.gl/Fz9nrQ',
        email: user.email || null,
        displayName: user.displayName || 'nameless user',
      };
      return userRef.set(data);
    }
}
