import { AngularFireAuth } from '@angular/fire/auth/auth';
import { map } from 'rxjs/internal/operators';

import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import {UserInterface} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private imageprofile: any;

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          console.log("registerUser ::: userData "+ userData.user.photoURL);
          this.imageprofile = userData.user.photoURL;
          return (resolve(userData) , this.updateUserData(userData.user));
        }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(
          userData => {
          console.log("loginEmailUser ::: userData"+ userData.user.photoURL);
           return resolve(userData);
          },
          err => reject(err));
    });
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }

  logoutUser() {

    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => {
      return auth;
    }));
  }

  private updateUserData(user) {
    console.log("updateUserData ::: userData = "+ this.imageprofile);

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        editor: true
      }
    }
    console.log("updateUserData ::: userData = "+ this.imageprofile);

    return userRef.set(data, { merge: true })
  }


  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }





}
