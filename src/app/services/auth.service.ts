import {AngularFireAuth} from '@angular/fire/auth/auth';
import {map} from 'rxjs/internal/operators';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import * as firebase from 'firebase/app';
import {UserData} from '../models/userdata';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {returnIsFirstChange} from '../components/breadcrumb/wizard.module';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userUid: any;
  isAdmin: boolean;
  userData: any;
  subscription: Subscription | undefined;
  authStateGuard: any;
  userRoles$: Observable<UserData>;
  private imageprofile: any;
  private fireAuthUser: firebase.User | null = null;
  private currentUser: any;
  private isAdminSub = new Subject<boolean>();
  private isLogged: boolean;
  private firebaseUser = new BehaviorSubject<firebase.User>(null);
  user$ = this.firebaseUser.asObservable();
  userRef;

  constructor(
    private router: Router,
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
          return this.afs.doc<UserData>(`userdatas/${user}`).valueChanges();
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

  get isUserAdmin2(): Observable<UserData | undefined> {

    let user = this.afsAuth.authState.pipe(map(user => user.uid));

    return this.afs.doc<UserData>(`userdatas/${user}`)
      .valueChanges()
      .pipe(map(user => user));
  }

  changeLoggedInUser(patient: any) {
    this.firebaseUser.next(patient);
  }

  getCurrentUser() {
    this.isAuth().subscribe(auth => {
      if (auth) {
        console.log("id de firebase "+ auth.uid)
        this.isLogged = true;
        this.userUid = auth.uid;
        this.getMyUserData(this.userUid).subscribe(
          user => {
            if (user) {
              console.log('user correctly registred ' + user.id);
            } else {
              console.log('user not registred ' + user.id);
            }
            this.isUserAdmin(user.id)
              .subscribe(userRole => {
                  console.log('is useradmin??? :::' + userRole);

                  this.isAdmin = Object
                    .assign({}, userRole.roles)
                    .hasOwnProperty('admin');
                  console.log('ADMINISTRATEUR :::' + this.isAdmin);
                },
                err => console.log(err),
                () => console.log('request completed.'));
          },
          error => { console.log('request error.',error)
          },
          () => { console.log('request error completed.')
          }
        );

        console.log('request completed.');
      } else {
        this.isLogged = false;
      }

    });
  }

  isUserAdmin3(userid: string) {
    return this.afs.doc<UserData>(`userdatas/${userid}`)
      .valueChanges()
      .pipe(map(user => this.isAdminSub.next(user.roles.admin)));
  }

  isUserAdmin(userid: string) {
    console.log('check roles admin ' + userid);
    return this.afs.doc<UserData>(`userdatas/${userid}`)
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
          console.log('registerUser ::: firebase user ' + userData.user.uid);
          this.imageprofile = userData.user.photoURL;
          return (resolve(userData) );
        }).catch(err => console.log(reject(err)));
    });
  }

  /*
    deleteUser(uid: string) {
      return new Promise((resolve, reject) => {
        this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
          .then(userData => {
            console.log('registerUser ::: firebase user ' + userData.user.uid);
            this.imageprofile = userData.user.photoURL;
            return (resolve(userData) );
          }).catch(err => console.log(reject(err)));
      });
    }*/

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
        this.router.navigate(['/user/login']);

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

  updateUserData(user) {
    console.log('updateUserData ::: userData = ' + this.imageprofile);

    let userRef: AngularFirestoreDocument<any>;
    userRef = this.afs.doc(`userdatas/${user.uid}`);
    const data: UserData = {
      id: user.uid,
      userUid: user.uid,
      email: user.email,
      roles: {
        editor: true
      },
      firstname: '',
      lastname: '',
      matricule: '',
      contract: '',
      site: '',
      agency: '',
      phonenumber: '',
      function: '',
      numberplate: '',
      manager: '',
      vancode: '',
      depotcode: '',
      sectorcode: '',
      weekhoursplanned: 0,
    };
    console.log('updateUserData ::: userData = ' + this.imageprofile);

    return userRef.set(data, {merge: true});
  }

  getMyUserData(useruid) {
    console.log("getting user data of "+ useruid);

    return this.afs.collection<UserData>('userdatas').snapshotChanges().pipe(first())
      .pipe(map(changes => {

        return changes.map(action => {
          const data = action.payload.doc.data() as UserData;
          data.id = action.payload.doc.data().id;
          return data;
        }).filter(data => {
          data.userUid == useruid?console.log("searching success for "+ data.userUid):
            console.log("searching ... "+ data.userUid);

          return data.userUid == useruid;
        }).pop();
      }));
  }

}
