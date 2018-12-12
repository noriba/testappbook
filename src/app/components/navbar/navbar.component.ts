import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }
  public app_name: string = 'BookStore';
  public isLogged: boolean = false;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NO user logged');
        this.isLogged = false;
        this.afsAuth.authState.pipe(map(authState =>   !!authState   ))

      }
    });
  }

  onLogout() {
    this.authService.logoutUser()
      .then(res => {
        debugger;
        console.log("Succes onLogout() :: "+res);
      })
      .catch(error => {
        console.log("Error onLogout() :: "+error);
      });

    //this.afsAuth.auth.signOut();
  }


}
