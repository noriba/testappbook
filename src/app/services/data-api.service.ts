import {BookInterface} from '../models/book';
import {Dayactivity, Dayovertime, Timesheet} from '../models/timesheet';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Product} from '../models/products';
import {HttpClient} from '@angular/common/http';
import {v4 as uuidv4} from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore,
              private http: HttpClient) {
  }

  private timesheet: Observable<Timesheet>;
  private timesheetList: Observable<Timesheet[]>;
  private timesheetsCollection: AngularFirestoreCollection<Timesheet>;
  private timesheetDoc: AngularFirestoreDocument<Timesheet>;
  public temporaryTimesheet: Timesheet = {
    weekhoursplanned: 0,
    statusmanager: {},
    weekactivities: [],
    id: null,
    userUid: null
  };
  public selectedDayActivity: Dayactivity = {id: null};
  public selectedDayOvertime: Dayovertime = {overtime: 0, day: null};
  public timesheets: Observable<Timesheet[]>;
  selectedActRow: number;
  selectedOtRow: number;

  private booksCollection: AngularFirestoreCollection<BookInterface>;
  private booksList: Observable<BookInterface[]>;
  private books: Observable<BookInterface[]>;
  private booksOffers: Observable<BookInterface[]>;
  private bookDoc: AngularFirestoreDocument<BookInterface>;
  private book: Observable<BookInterface>;
  public selectedBook: BookInterface = {id: null};
  public selectedTimesheet: Timesheet = {weekactivities: [], id: null};
  public selectedProduct: Product = {id: null};

  selectedRow: number;


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
    }).catch(err => {
      console.log('err', err.message);
    });
  }

  addBook(book: BookInterface) {
    let uuid = uuidv4();
    book.id = uuid;
    return new Promise((resolve, reject) => {
      this.booksCollection.add(book)
        .then(userData => {
        })
        .catch(err => console.log(reject(err)));
    });
  }

//---------------------------------------------------------------------------

  deleteTimesheet(idTimesheet: string) {
    this.timesheetDoc = this.afs.doc<Timesheet>(`timesheets/${idTimesheet}`);
    return this.timesheetDoc.delete().then((res) => {
    }).catch(err => {
      console.log('err', err.message);
    });
  }

  getMyTimesheets(user) {
    this.timesheetsCollection = this.afs.collection<Timesheet>('timesheets');
    return this.timesheetList = this.timesheetsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Timesheet;
          data.id = action.payload.doc.data().id;
          return data;
        }).filter(data => data.userUid == user);
      }));
  }

  updateTimesheet() {
    let idTimesheet = this.temporaryTimesheet.id;
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
    let uuid = uuidv4();
    timesheet.id = uuid;
    return new Promise((resolve, reject) => {
      this.timesheetsCollection.add(timesheet)
        .then(userData => {
          console.log('success');
        })
        .catch(err => console.log(reject(err)));
    });
  }


  createNewtemporaryTimesheet(timesheet: Timesheet) {
    this.temporaryTimesheet = {...this.temporaryTimesheet, ...timesheet};
    console.log('Temporary timesheet created :' + JSON.stringify(this.temporaryTimesheet));
  }

  createNewActivity(activity: Dayactivity) {
    console.log('new activity created :' + JSON.stringify(activity));
    console.log('current timesheet :' + JSON.stringify(this.temporaryTimesheet));
    console.log('current timesheet acts :' + JSON.stringify(this.temporaryTimesheet.weekactivities));
    this.temporaryTimesheet.weekactivities?.push(activity);
  }

  getAllTimesheets() {
    this.timesheetsCollection = this.afs.collection<Timesheet>('timesheets');
    return this.timesheets = this.timesheetsCollection
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Timesheet;
          data.id = action.payload.doc.data().id;
          return data;
        });
      }));
  }

}
