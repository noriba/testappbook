import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../services/data-api.service';
import {AuthService} from '../services/auth.service';
import {UserData} from '../models/userdata';
import {UserDataService} from '../services/user-data.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserDataComponent implements OnInit {

  constructor(private userDataService: UserDataService, private authService: AuthService) { }

  allUserDatas: UserData[];
  isAdmin: any ;
  userUid: string ;

  ngOnInit() {
    this.getCurrentUser();
    this.getListUserDatas();
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

  getListUserDatas() {
    this.userDataService.getAllUserData()
      .subscribe(UserDatas => {
        this.allUserDatas = UserDatas;
      });
  }

  onDeleteUserData(idUserData: string): void {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.userDataService.deleteUserData(idUserData);
    }
  }

  onPreUpdateUserData(UserData: UserData) {
    console.log('UserData', UserData);
    this.userDataService.selectedUserData = Object.assign({}, UserData);
  }

}
