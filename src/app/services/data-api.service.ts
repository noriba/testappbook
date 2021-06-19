import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction} from '@angular/fire/firestore';
import { BookInterface } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import {User} from 'firebase';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) { }
  private booksCollection: AngularFirestoreCollection<BookInterface>;
  private booksList: Observable<BookInterface[]>;
  private books: Observable<BookInterface[]>;
  private bookDoc: AngularFirestoreDocument<BookInterface>;
  private book: Observable<BookInterface>;
  public selectedBook: BookInterface = { id: null };

  getAllBooks() {
    debugger;
    this.booksCollection = this.afs.collection<BookInterface>('books');
    return this.books = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getMyBooks(user) {
    debugger;
    this.booksCollection = this.afs.collection<BookInterface>('books');
    return this.booksList = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map( action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
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
          data.id = action.payload.id;
          return data;
      }
    }));
  }

  getAllBooksOffers() {
    this.booksCollection = this.afs.collection('books', ref => ref.where('oferta', '==', '1'));
    return this.books = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }



  addBook(book: BookInterface) {
    debugger;
    return new Promise((resolve, reject) => {

      this.booksCollection.add(book)
        .then(userData => {
        }).catch(err => console.log(reject(err)))

    })
  }

  updateBook(book: BookInterface) {
    let idBook = book.id;
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return this.bookDoc.update(book).then((res) => {
    }).catch(err => {
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
}
