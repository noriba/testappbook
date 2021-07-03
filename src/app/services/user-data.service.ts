import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument} from '@angular/fire/firestore';
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
  public selectedUserData : UserData = {
    roles: undefined,
    userUid: '',
    id: null};

  constructor(private afs: AngularFirestore,
              private http: HttpClient) { }

  getMyUserData(user) {
    this.userDataCollection = this.afs.collection<UserData>('userdatas');
    return this.userDataList = this.userDataCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserData;
          data.id = action.payload.doc.data().id;
          return data;
        }).filter(data => data.userUid == user);
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
    let idUserData = user.id;
    this.userDataDoc = this.afs.doc<UserData>(`userdatas/${idUserData}`);
    return this.userDataDoc.update(user)
      .then((res) => {
      })
      .catch(err => {
        console.log('err', err.message);
      });
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
    return new Promise((resolve, reject) => {
      this.userDataCollection.add(user)
        .then(userData => {
          console.log('userData.id ::: ' + userData.id);
          console.log('userData.id ::: ' + typeof userData);
          user.id=userData.id;
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
