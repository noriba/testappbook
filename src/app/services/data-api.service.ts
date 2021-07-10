import {BookInterface} from '../models/book';
import {Dayactivity, Dayovertime, Timesheet} from '../models/timesheet';
import {map,take} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import {UserData} from '../models/userdata';
import {FirestoreCrudService} from './firestore-crud.service';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  selectedTimesheetDayActivities: Dayactivity[];
  selectedTimesheetSumHoursDone: any;
  selectedTimesheetSumOvertimes: number;
  selectedTimesheetDayovertimes: Dayovertime[]= [];

  constructor(private afs: AngularFirestore,
              private http: HttpClient) {

  }

  private userDataCollection: AngularFirestoreCollection<UserData>;
  private temporaryUserData: UserData;
  private crudService: FirestoreCrudService<Timesheet>;
  private userDataList: Observable<UserData[]>;

  private timesheetList: Observable<Timesheet[]>;
  private timesheetsCollection: AngularFirestoreCollection<Timesheet>;
  private timesheetDoc: AngularFirestoreDocument<Timesheet>;
  public timesheets: Observable<Timesheet[]>;
  private timesheet: Observable<Timesheet>;

  private booksCollection: AngularFirestoreCollection<BookInterface>;
  private booksList: Observable<BookInterface[]>;
  private books: Observable<BookInterface[]>;
  private booksOffers: Observable<BookInterface[]>;
  private bookDoc: AngularFirestoreDocument<BookInterface>;
  private book: Observable<BookInterface>;

  public selectedDayActivity: Dayactivity = {id: null};
  public selectedDayOvertime: Dayovertime = {overtime: 0, day: null};
  selectedActRow: number;
  selectedOtRow: number;
  selectedRow: number;
  public selectedBook: BookInterface = {id: null};
  public selectedTimesheet: Timesheet = {weekactivities: [], id: null};

  public temporaryTimesheet: Timesheet = {
    weekhoursplanned: 0,
    statusmanager: {},
    weekactivities: [],
    id: null,
    userUid: null
  };


// -----------------------------------------------------------------------

  getMyTimesheetsJSON() {
    return this.http.get<any>('assets/timesheets.json')
      .toPromise()
      .then(res => <Timesheet[]>res.data)
      .then(data => {
        return data;
      });
  }

  getAllBooks() {
    this.booksCollection = this.afs.collection<BookInterface>('books');
    return this.books = this.booksCollection
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.data().id;
          return data;
        });
      }));
  }

  getMyBooks(user) {
    this.booksCollection = this.afs.collection<BookInterface>('books');
    return this.booksList = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.data().id;
          console.log('data.id ::: ' + data.id);
          return data;
        }).filter(data => data.userUid == user);
      }));
  }

  getOneBook(idBook: string) {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return this.book = this.bookDoc
      .snapshotChanges()
      .pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as BookInterface;
          data.id = action.payload.data().id;
          return data;
        }
      }));
  }

  getOneTimesheet(id: string) {
    this.timesheetDoc = this.afs.doc<Timesheet>(`timesheets/${id}`);
    return this.timesheet = this.timesheetDoc
      .snapshotChanges()
      .pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Timesheet;
          data.id = action.payload.data().id;
          return data;
        }
      }));
  }

  getAllBooksOffers() {
    this.booksCollection = this.afs.collection('books', ref => ref.where('oferta', '==', '1'));
    return this.booksOffers = this.booksCollection
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.data().id;
          return data;
        });
      }));
  }

  updateBook(book: BookInterface) {
    let idBook = book.id;
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return this.bookDoc.update(book)
      .then((res) => {
      })
      .catch(err => {
        console.log('err', err.message);
      });
  }

  deleteBook(idBook: string) {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return this.bookDoc.delete().then((res) => {
      console.log('Document successfully deleted!');

    }).catch(err => {
      console.log('err', err.message);
    });
  }

  addBook(book: BookInterface) {
    return new Promise((resolve, reject) => {
      this.booksCollection.add(book)
        .then(userData => {
          console.log('userData.id ::: ' + userData.id);
          console.log('userData.id ::: ' + typeof userData);
          book.id = userData.id;
          this.updateBook(book);
        })
        .catch(err => console.log(reject(err)));
    });
  }

//---------------------------------------------------------------------------

  deleteTimesheet(idTimesheet: string) {

    //const res = await this.afs.doc<Timesheet>(`timesheets/${idTimesheet}`)
    this.timesheetDoc = this.afs.collection<Timesheet>(`timesheets`).doc(idTimesheet);
    return this.timesheetDoc.delete().then((res) => {
      console.log('Document successfully deleted!');
    }).catch(err => {
      console.log('err', err.message);
    });
  }


  getAllTimesheets() {
    this.timesheetsCollection = this.afs.collection<Timesheet>('timesheets');
    return this.timesheets = this.timesheetsCollection
      .snapshotChanges().pipe(take(1))
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Timesheet;
          data.id = action.payload.doc.data().id;
          return data;
        });
      }));
  }

  getMyTimesheets(user) {
    this.timesheetsCollection = this.afs.collection<Timesheet>('timesheets');
    return this.timesheetList = this.timesheetsCollection
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Timesheet;
          data.id = action.payload.doc.data().id;
          console.log(action);
          console.log(data);
          return data;
        }).filter(data => data.userUid == user);
      }));
  }

  updateTimesheet(timesheet: Timesheet) {
    //let idTimesheet = this.temporaryTimesheet.id;
    let idTimesheet = timesheet.id;
    this.timesheetDoc = this.afs.doc<Timesheet>(`timesheets/${idTimesheet}`);
    return this.timesheetDoc.update(this.temporaryTimesheet)
      .then((res) => {
      })
      .catch(err => {
        console.log('err', err.message);
      });
  }

  createNewTimesheet(timesheet: Timesheet) {
    // return    this.afs.collection('timesheets').add(timesheet).then(function(docRef) {
    //   return docRef.id;
    // });
    //let uuid = uuidv4();
    //timesheet.id = uuid;
    console.log('timesheet ::: ' + JSON.stringify(timesheet));
    this.timesheetsCollection = this.afs.collection<Timesheet>('timesheets');

    return new Promise((resolve, reject) => {
      this.timesheetsCollection.add(timesheet)
        .then(userData => {
          console.log('success');
          console.log('userData.id ::: ' + userData.id);
          timesheet.id = userData.id;
          console.log(this.temporaryTimesheet);
          this.updateTimesheet(timesheet);
        })
        .catch(err => console.log(reject(err)));
    });
  }

  getNumberOfWeek(): number {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  resetTemporaryTimesheet(userData: UserData) {
    console.log('Temporary timesheet created :' +
      JSON.stringify(userData));

    this.temporaryTimesheet = {
      year: new Date().getFullYear(),
      week: this.getNumberOfWeek(),
      matricule: userData?.matricule,
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      site: userData?.site,
      contracttype: userData?.contract,
      weekhoursplanned: userData?.weekhoursplanned,
      statusmanager: {},
      weekactivities: [],
      id: null,
      userUid: userData?.userUid
    };
  }

  createNewtemporaryTimesheet(timesheet: Timesheet) {

    this.temporaryTimesheet = {...this.temporaryTimesheet, ...timesheet};
    console.log('Temporary timesheet created :' + JSON.stringify(this.temporaryTimesheet));
  }

  createNewActivity(activity: Dayactivity) {
    console.log('new activity created :' + JSON.stringify(activity));
    console.log('current timesheet :' + JSON.stringify(this.temporaryTimesheet));
    this.temporaryTimesheet.weekactivities?.push(activity);
    console.log('current timesheet acts :' + JSON.stringify(this.temporaryTimesheet.weekactivities));

  }


  //---------------------------------------------------------------------

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

  createNewUserData(userData: UserData) {
    return new Promise((resolve, reject) => {
      this.userDataCollection.add(userData)
        .then(userData => {
          console.log('success');
          console.log(this.temporaryUserData);
        })
        .catch(err => console.log(reject(err)));
    });
  }


}
