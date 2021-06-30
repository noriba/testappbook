import {AngularFireAuth} from '@angular/fire/auth/auth';
import {map} from 'rxjs/internal/operators';
import {Subscription} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import {UserInterface} from '../models/user';
import * as firebase from 'firebase/app';
import { of,Observable } from 'rxjs';
import {Timesheet} from '../models/timesheet';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private imageprofile: any;
  public userUid: any;
  private isAdmin: boolean;
  userData: any;
  subscription: Subscription | undefined;

  private fireAuthUser: firebase.User | null = null;
  private currentUser: any;

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.subscription = this.afsAuth.authState.subscribe(fireAuthUser => {
      this.fireAuthUser = fireAuthUser;
    });


    this.afsAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });


  }

  public get currentUser$(): Observable<firebase.User | undefined> {
    return this.afsAuth.authState.pipe(map(user => user));
  }

  // this fonction is use to get the information of the curent user, we store them in curentUser
  getCurrentUser5()  {
    return this.afsAuth.authState;
  }



  getCurrentUser4() {
    return this.afsAuth.authState.pipe(map (user => { return user }))
  }

  getCurrentUser2() {
    return this.afsAuth.authState.toPromise()
        .then((res) => {
      })
        .catch(err => {
          console.log('err', err.message);
        });}

  getCurrentUser() {
    this.isAuth().pipe(map(auth => {
      if (auth) {
        this.userUid = auth.uid;
         this.isUserAdmin(this.userUid)
          .subscribe(userRole => {
            this.isAdmin = Object
              .assign({}, userRole.roles)
              .hasOwnProperty('admin');
          });
      }
    }));
  }


  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          console.log('registerUser ::: userData ' + userData.user.photoURL);
          this.imageprofile = userData.user.photoURL;
          return (resolve(userData) , this.updateUserData(userData.user));
        }).catch(err => console.log(reject(err)));
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(
          userData => {
            console.log('loginEmailUser ::: userData' + userData.user.photoURL);
            return resolve(userData);
          },
          err => reject(err));
    });
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => this.updateUserData(credential.user));
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user));
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
    console.log('updateUserData ::: userData = ' + this.imageprofile);

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        editor: true
      }
    };
    console.log('updateUserData ::: userData = ' + this.imageprofile);

    return userRef.set(data, {merge: true});
  }


  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }


}
