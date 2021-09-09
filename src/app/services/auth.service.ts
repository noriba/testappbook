import {AngularFireAuth} from '@angular/fire/auth/auth';
import {map} from 'rxjs/internal/operators';
import {BehaviorSubject, Observable, of, Subject, Subscription, AsyncSubject} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import * as firebase from 'firebase/app';
import {UserData} from '../models/userdata';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {first, takeUntil, catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {concat} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUid: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  imageprofile: any;
  private subscription: Subscription;
  _loggedOutEmitter = new Subject<boolean>();
  _adminOutEmitter = new Subject<boolean>();


  constructor(
    private router: Router,
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore) {
    this.getCurrentUser();
  }


  getCurrentUser() {
    this.isAuth().subscribe(auth => {
      if (auth) {
        console.log('id de firebase ' + auth.uid);
        this.userUid.next(auth.uid);
        this.getMyUserData(auth.uid).subscribe(
          user => {
            if (!user) {
              this.logoutUser();
              this.isLogged.next(false);
              console.log('user not registered ');
              return;
            } else {
              this.isLogged.next(true);
              console.log('user correctly registered ' + JSON.stringify(user));
              user.roles.admin ?
                this.isAdmin.next(true) : this.isAdmin.next(false);
              console.log('ADMINISTRATEUR ? :::' + this.isAdmin.value);

              this._adminOutEmitter.next(true);
              /* this.subscription = this.isUserAdmin(user.id)
               .pipe(takeUntil(this._loggedOutEmitter))
               .subscribe(userRole => {
                   console.log('is useradmin??? :::' + JSON.stringify(userRole));

                   userRole.roles.admin?
                   this.isAdmin.next(true):this.isAdmin.next(false);

                   this._adminOutEmitter.next(true);

                   console.log('ADMINISTRATEUR :::' + this.isAdmin.value);
                 },
                 err => console.log('request completed.', err),
                 () => console.log('request completed.'));*/
            }
          },
          error => {
            console.log('request error.', error);
          },
          () => {
            console.log('request getmyuserdata completed.');
          });
      } else {
        this.isLogged.next(false);
      }
    }, err => console.log('error', err));
  }


  isUserAdmin(userid) {
    console.log('check roles admin ' + userid);
    this.afs.doc<UserData>(`userdatas/${userid}`);
    return this.afs.doc<UserData>(`userdatas/${userid}`)
      .valueChanges();
  }


  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          this.isLogged.next(true);
          console.log('registerUser ::: firebase user ' + userData.user.uid);
          this.imageprofile = userData.user.photoURL;
          return (resolve(userData));
        }).catch(err => console.log(reject(err)));
    });
  }


  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(
          user => {
            this.getMyUserData(user.user.uid).subscribe(
              userdata => {
                if (!userdata) {
                  console.log('Aucune données utilisateur trouvées');
                  this.logoutUser();
                  this.isLogged.next(false);
                  this.router.navigate(['/user/login']);

                } else {
                  this.isLogged.next(true);
                  this.router.navigate(['timesheet']);
                }
              }, err => console.log(err));
            console.log('loginEmailUser ::: userData' + user.user.photoURL);
            return resolve(user);
          },
          err => reject(err))
        .catch(err => {
          console.log('ERRRRRRRRRRRRRRRRRRRRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR', err.message);
        });
    });
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => {
        this.isLogged.next(true);
        this.router.navigate(['timesheet']);

        return this.updateUserDataWithCredentials(credential.user);
      });
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => {
        this.isLogged.next(true);
        this.router.navigate(['timesheet']);

        return this.updateUserDataWithCredentials(credential.user);
      });
  }

  logoutUser() {
    return this.afsAuth.auth.signOut()
      .then(() => {
        this.isAdmin.next(false);
        this.isLogged.next(false);
        this._loggedOutEmitter.next(true);

        console.log('Succes onLogout() ');
        this.router.navigate(['/user/login']);
      })
      .catch(error => {
        console.log('Error onLogout() :: ' + error);
      });
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => {
      return auth;
    }));
  }

  updateUserDataWithCredentials(user) {
    console.log('updateUserData ::: ', JSON.stringify(user));
    let userRef: AngularFirestoreDocument<any>;
    let usertomerge;
    userRef = this.afs.doc(`userdatas/${user.uid}`);
    userRef.valueChanges()
      .pipe(takeUntil(this._loggedOutEmitter))
      .subscribe(
      user => {
        console.log('data to merge ::: ', user);
        let data: UserData;
        if (!user) {
          data = {
            id: user.uid,
            userUid: user.uid,
            email: user.email,
            roles: {
              editor: true,
              admin: false,
              owner: true
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
            weekhoursplanned: 35,
          };
        } else {
          data = user;
        }

        return userRef.set(data, {merge: true});

      }, err => console.error(err));

  }

  getMyUserData(useruid) {
    console.log('getting user data of ' + useruid);
    console.log('search of ' + useruid);

    return this.afs.collection<UserData>('userdatas')
      .snapshotChanges()
      .pipe(first())
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserData;
          data.id = action.payload.doc.data().id;
          return data;
        }).filter(data => {
          data.userUid == useruid ?
            console.log('searching success for ' + data.userUid) :
            console.log('searching ... ' + data.userUid);
          return data.userUid == useruid;
        }).shift();
      }));
  }


}
