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
  private userUid: string;

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }
   app_name: string = 'VRP Manager';
   isLogged: boolean = false;
   isAdmin : boolean;

  ngOnInit() {
    this.getCurrentUser();
  }


  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.isLogged= true;
        this.userUid = auth.uid;
        this.authService
          .isUserAdmin(this.userUid)
          .subscribe(userRole => {
            this.isAdmin = Object
              .assign({}, userRole.roles)
              .hasOwnProperty('admin');
            console.log("ADMINISTRATEUR :::" + this.isAdmin)
          });
      }else          this.isLogged= false;

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
