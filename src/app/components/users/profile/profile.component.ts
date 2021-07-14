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

  defaultPhotoUrl="https://firebasestorage.googleapis.com/v0/b/book-mgr.appspot.com/o/uploads%2Fprofile_default?alt=media&token=94ed6cc5-fb21-47dd-bb15-6827d1225463";

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
