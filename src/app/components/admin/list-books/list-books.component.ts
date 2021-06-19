import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { BookInterface } from '../../../models/book';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }

  allBooks: BookInterface[];
  private isAdmin: any ;
  private userUid: string ;

  ngOnInit() {
    this.getCurrentUser();
    this.getListBooks();
  }

  getCurrentUser() {
    debugger;
    this.authService.isAuth().subscribe(auth => {
      debugger;
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }
    })
  }
  getListBooks() {
    debugger;
    this.dataApi.getAllBooks()
      .subscribe(books => {
        debugger;
        this.allBooks = books;
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
