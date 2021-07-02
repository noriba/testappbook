import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { BookInterface } from '../../../models/book';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }

  allBooks: BookInterface[];
   isAdmin: any ;
  userUid: string ;

  ngOnInit() {
    this.getCurrentUser();
    this.getListBooks();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }
    })
  }

  getListBooks() {
    this.dataApi.getAllBooks()
      .subscribe(books => {
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
