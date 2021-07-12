import {Component, OnInit} from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import {BookInterface} from '../../models/book';


@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) {
  }

  myBooks: BookInterface[];
  private isAdmin: any;
  private userUid: string;

  ngOnInit() {
    this.getCurrentUser();
    //this.getMyBooks();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.getMyBooks(this.userUid);
        this.authService
          .isUserAdmin(this.userUid)
          .subscribe(userRole => {
            this.isAdmin = Object
              .assign({}, userRole.roles)
              .hasOwnProperty('admin');
          },err=>err);
      }
    },err=>err);
  }

  getMyBooks(userId) {
    this.dataApi.getMyBooks(userId)
      .subscribe(books => {
        this.myBooks = books;
      });
  }

  onDeleteBook(idBook: string): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.dataApi.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book: BookInterface) {
    console.log('BOOK', book);
    this.dataApi.selectedBook = Object.assign({}, book);
  }

}
