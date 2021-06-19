import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, private authService: AuthService) { }
  public email: string = '';
  public password: string = '';
  isError: boolean;


  ngOnInit() {
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => {
        this.isError=true;
      console.log('err', err.message);
    });
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => {
      this.isError=true;
      console.log('err', err.message);
    });
  }
  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => {
      this.isError=true;
      console.log('err', err.message);
    });
  }

  onLoginRedirect(): void {
    this.router.navigate(['my-books']);
  }
}
