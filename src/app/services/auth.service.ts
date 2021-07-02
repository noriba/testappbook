import {AngularFireAuth} from '@angular/fire/auth/auth';
import {map} from 'rxjs/internal/operators';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import {UserInterface} from '../models/user';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userUid: any;
  isAdmin: boolean;
  userData: any;
  subscription: Subscription | undefined;
  authStateGuard: any;
  userRoles$: Observable<UserInterface>;
  private imageprofile: any;
  private fireAuthUser: firebase.User | null = null;
  private currentUser: any;
  private isAdminSub = new Subject<boolean>();
  private isLogged: boolean;
  private firebaseUser = new BehaviorSubject<firebase.User>(null);
  user$ = this.firebaseUser.asObservable();

  constructor(
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore) {
    this.subscription = this.afsAuth
      .authState
      .subscribe(fireAuthUser => {
        this.fireAuthUser = fireAuthUser;
      });

    this.getCurrentUser();
    this.userRoles$ = this.afsAuth.authState
      .pipe(user => {
        this.changeLoggedInUser(user);
        if (user) {
          return this.afs.doc<UserInterface>(`users/${user}`).valueChanges();
        } else {
          return of(null);
        }
      });
    /*    this.afsAuth.authState.subscribe(user => {
          if (user) {
            this.userData = user;
            localStorage.setItem('user', JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user'));
          } else {
            localStorage.setItem('user', null);
            JSON.parse(localStorage.getItem('user'));
          }
        });*/


  }

  get currentUser$(): Observable<firebase.User | undefined> {
    return this.afsAuth.authState.pipe(map(user => user));
  }

  get isUserAdmin2(): Observable<UserInterface | undefined> {

    let user = this.afsAuth.authState.pipe(map(user => user.uid));

    return this.afs.doc<UserInterface>(`users/${user}`)
      .valueChanges()
      .pipe(map(user => user));
  }

  changeLoggedInUser(patient: any) {
    this.firebaseUser.next(patient);
  }

  getCurrentUser() {
    debugger
    this.isAuth().subscribe(auth => {
      debugger
      if (auth) {
        this.isLogged = true;
        this.userUid = auth.uid;
        this.isUserAdmin(this.userUid)
          .subscribe(userRole => {
            debugger
            this.isAdmin = Object
              .assign({}, userRole.roles)
              .hasOwnProperty('admin');
            console.log('ADMINISTRATEUR :::' + this.isAdmin);
          });
      } else {
        this.isLogged = false;
      }

    });
  }

  isUserAdmin3(userid: string) {
    return this.afs.doc<UserInterface>(`users/${userid}`)
      .valueChanges()
      .pipe(map(user => this.isAdminSub.next(user.roles.admin)));
  }

  isUserAdmin(userid: string) {
    return this.afs.doc<UserInterface>(`users/${userid}`)
      .valueChanges();
  }


  // this fonction is use to get the information of the curent user, we store them in curentUser
  getCurrentUser5() {
    return this.afsAuth.authState;
  }


  getCurrentUser4() {
    return this.afsAuth.authState.pipe(map(user => {
      return user;
    }));
  }

  getCurrentUser2() {
    return this.afsAuth.authState.toPromise()
      .then((res) => {
      })
      .catch(err => {
        console.log('err', err.message);
      });
  }

  /*  getCurrentUser() {
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
    }*/


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

    return this.afsAuth.auth.signOut()
      .then(res => {
      console.log('Succes onLogout() :: ' + res);
    })
      .catch(error => {
        console.log('Error onLogout() :: ' + error);
      });
    ;
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


}
