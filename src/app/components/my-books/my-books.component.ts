import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import {BookInterface} from '../../models/book';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }

    myBooks: BookInterface[];
  private isAdmin: any ;
  private userUid: string;

  ngOnInit() {
    this.getCurrentUser();
    //this.getMyBooks();
  }

  getCurrentUser() {
    debugger;
    this.authService.isAuth().subscribe(auth => {
      debugger;
      if (auth) {
        this.userUid= auth.uid;
        this.getMyBooks(this.userUid);
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }
    })
  }
  getMyBooks(userId) {
    debugger;
    this.dataApi.getMyBooks(userId)
      .subscribe(books => {
        debugger;
        this.myBooks = books;
      });
  }

  onDeleteBook(idBook: string): void {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApi.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book: BookInterface) {
    console.log('BOOK', book);
    this.dataApi.selectedBook = Object.assign({}, book);
  }

}
