import {AngularFireAuth} from '@angular/fire/auth/auth';
import {map} from 'rxjs/internal/operators';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import * as firebase from 'firebase/app';
import {UserData} from '../models/userdata';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {first} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUid:BehaviorSubject<string> = new BehaviorSubject<string>(null);
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  subscription: Subscription | undefined;
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  imageprofile: any;

  constructor(
    private router: Router,
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore) {
    this.getCurrentUser();
  }

  get currentUser$(): Observable<firebase.User | undefined> {
    return this.afsAuth.authState.pipe(map(user => user));
  }



  getCurrentUser() {
    this.isAuth().subscribe(auth => {
      if (auth) {
        console.log('id de firebase ' + auth.uid);
        this.isLogged.next(true);
        this.userUid.next(auth.uid);
        this.getMyUserData(auth.uid).subscribe(
          user => {
            if (user) {
              console.log('user correctly registered ' + user.id);
            } else {
              this.isLogged.next(false);

               console.log('user not registered ');
            }
            this.subscription = this.isUserAdmin(user.id)
              .subscribe(userRole => {
                  console.log('is useradmin??? :::' + userRole);

                  this.isAdmin.next( Object
                    .assign({}, userRole.roles)
                    .hasOwnProperty('admin'));
                  console.log('ADMINISTRATEUR :::' + this.isAdmin);
                },
                err => console.log('request completed.', err),
                () => console.log('request completed.'));
          },
          error => {
            console.log('request error.', error);
          },
          () => {
            console.log('request error completed.');
          });
        console.log('request completed.');
      } else {
        this.isLogged.next(false);
      }
    }, err => console.log('error', err));
  }


  isUserAdmin(userid: string) {
    console.log('check roles admin ' + userid);
    return  this.afs.doc<UserData>(`userdatas/${userid}`)
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
          userData => {
            this.isLogged.next(true)

            console.log('loginEmailUser ::: userData' + userData.user.photoURL);
            return resolve(userData);
          },
          err => reject(err));
    });
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => {
        this.isLogged.next(true)

        return this.updateUserData(credential.user);
      });
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => {
        this.isLogged.next(true)
        return this.updateUserData(credential.user);
      });
  }

  logoutUser() {

    return this.afsAuth.auth.signOut()
      .then(() => {
        this.isAdmin.unsubscribe();
        this.userUid.unsubscribe();
        this.isLogged.next(false);
        this.subscription.unsubscribe();
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

  updateUserData(user) {

    let userRef: AngularFirestoreDocument<any>;
    userRef = this.afs.doc(`userdatas/${user.uid}`);
    const data: UserData = {
      id: user.uid,
      userUid: user.uid,
      email: user.email,
      roles: {
        editor: true,
        admin: false
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
      photoUrl: '',
      depotcode: '',
      sectorcode: '',
      weekhoursplanned: 0,
    };

    return userRef.set(data, {merge: true});
  }

  getMyUserData(useruid) {
    console.log('getting user data of ' + useruid);
    console.log('search of' + useruid);

    return this.afs.collection<UserData>('userdatas').snapshotChanges().pipe(first())
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserData;
          data.id = action.payload.doc.data().id;
          return data;
        }).filter(data => {

          data.userUid == useruid ? console.log('searching success for ' + data.userUid) :
            console.log('searching ... ' + data.userUid);

          return data.userUid == useruid;
        }).shift();
      }));
  }

}
