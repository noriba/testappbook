import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth/auth';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {first,map} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private afsAuth: AngularFireAuth,
              private router: Router,
  ) {  }

  app_name: string = 'VRP Manager';
  isLogged: Observable<boolean> ;
  isAdmin: Observable<boolean>;
  userUid: Observable<string>;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin.pipe();
    this.isLogged = this.authService.isLogged.pipe();
    this.userUid = this.authService.userUid.pipe();
  }


  /*getCurrentUser() {
    this.subscription = this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.isLogged = true;
        this.userUid = auth.uid;
        this.subscription = this.authService
          .isUserAdmin(this.userUid)
          .subscribe(userRole => {
              this.isAdmin = Object
                .assign({}, userRole.roles)
                .hasOwnProperty('admin');
              console.log('ADMINISTRATEUR :::' + this.isAdmin);
            },
            err => console.log('error', err),
            () => console.log('completed'));
      } else {
        this.isLogged = false;
      }

    }, err => console.log('error', err));
  }*/

  onLogout() {
    this.authService.logoutUser()
      .then(() => {
        this.router.navigate(['/user/login']);
        console.log('Succes onLogout() :: ');
      })
      .catch(error => {
        console.log('Error onLogout() :: ' + error);
      });

  }


}
