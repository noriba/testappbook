import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import {BookInterface} from '../../models/book';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  private books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      console.log('id :', auth.uid);
      console.log('displayName :', auth.displayName);
      console.log('phoneNumber :', auth.phoneNumber);
      console.log('email :', auth.email);
      console.log('photoURL :', auth.photoURL);
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          // this.isAdmin = true;
          console.log('err Admin role test', this.isAdmin);
          console.log('err Roles finded', userRole.roles);
        })
      }
    })
  }
  getListBooks() {
    this.dataApi.getAllBooks()
      .subscribe(books => {
        this.books = books;
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
