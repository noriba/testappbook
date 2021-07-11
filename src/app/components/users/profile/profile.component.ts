import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserInterface} from '../../../models/user';
import {UserData} from '../../../models/userdata';
import {UserDataService} from '../../../services/user-data.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private userDataService: UserDataService,
              ) {  }

  user: UserData = {
    firstname: '',
    lastname: '',
    email: '',
    photoUrl: '',
    roles: {}
  };


  ngOnInit() {
    this.userDataService.getMyUserData(this.authService.userUid.value)
      .pipe(takeUntil(this.authService._loggedOutEmitter))
      .subscribe(user => {
      console.log(user)
      console.log(user.firstname)
      if (user) {
        this.user.firstname = user.firstname;
        this.user.lastname = user.lastname;
        this.user.email = user.email;
        this.user.photoUrl = user.photoUrl;
      }
    },err => console.log(err));
  }

}
