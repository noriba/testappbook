import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import {map} from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }
   app_name: string = 'BookStore';
   isLogged: boolean = false;

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
        console.log("Succes onLogout() :: "+res);
      })
      .catch(error => {
        console.log("Error onLogout() :: "+error);
      });

  }


}
