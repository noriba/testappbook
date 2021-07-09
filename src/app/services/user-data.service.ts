import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {UserInterface} from '../models/user';
import {UserData} from '../models/userdata';
import {BookInterface} from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userDataCollection: AngularFirestoreCollection;
  private userDatas: UserInterface[];
  private userDataList: Observable<UserData[]>;
  private userDataDoc: AngularFirestoreDocument;
  public selectedUserData: UserData = {
    roles: undefined,
    userUid: '',
    id: null
  };
  private myUserData: Observable<UserData>;

  constructor(private afs: AngularFirestore,
              private http: HttpClient) {
  }

  getMyUserData(userid) {
    this.userDataCollection = this.afs.collection<UserData>('userdatas');
    return this.myUserData = this.userDataCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserData;
          data.id = action.payload.doc.data().id;
          return data;
        }).filter(data => data.userUid == userid).shift();
      }));
  }

  getOneUserData(userid: string) {
    this.userDataDoc = this.afs.doc<UserData>(`books/${userid}`);
    return this.myUserData = this.userDataDoc
      .snapshotChanges()
      .pipe(map(action => {
        if (action.payload.exists === false) {
          console.log("getOneUserData :::",action.payload.data())
          return null;
        } else {
          const data = action.payload.data() as UserData;
          console.log("getOneUserData :::",data)

          data.id = action.payload.data().id;
          return data;
        }
      }));
  }

  getAllUserData() {
    this.userDataCollection = this.afs.collection<UserData>('userdatas');
    return this.userDataList = this.userDataCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserData;
          data.id = action.payload.doc.data().id;
          return data;
        });
      }));
  }

  updateUserData(user: UserData) {
    console.log('Mettre a jour userData.id ::: ' + user.id);
    console.log('Mettre a jour userData.useruid ::: ' + user.userUid);
    let idUserData = user.userUid;
    this.userDataDoc = this.afs.doc<UserData>(`userdatas/${idUserData}`);
    let data: UserData = {
      id: user.userUid,
      userUid: user.userUid,
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
      photoUrl:'',
      depotcode: '',
      sectorcode: '',
      weekhoursplanned: 0,
    };
    console.log('MERGE ::: data = ' + JSON.stringify(data));
    console.log('MERGE ::: user = ' + JSON.stringify(user));

    data={...data,...user}


    return this.userDataDoc.set(data, {merge: true});
  }

  deleteUserData(idUserData: string) {
    this.userDataDoc = this.afs.doc<UserData>(`userdatas/${idUserData}`);
    return this.userDataDoc.delete().then((res) => {
      console.log('Document successfully deleted!');

    }).catch(err => {
      console.log('err', err.message);
    });
  }

  addUserData(user: UserData) {
    console.log("adduser :::::: "+user.firstname);
    let data: UserData = {
      id: '',
      userUid: '',
      email: '',
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
    user = {...data, ...user};
    return new Promise((resolve, reject) => {
      this.userDataCollection.add(user)
        .then(userData => {
          console.log('userData.id a bien été créé ::: ' + userData.id);
          user.id = userData.id;
          this.updateUserData(user);
        })
        .catch(err => console.log(reject(err)));
    });
  }

  isUserAdmin(userid: string) {
    return this.afs.doc<UserData>(`userdatas/${userid}`)
      .valueChanges();
  }
}
