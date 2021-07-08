import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserData} from '../models/userdata';
import {UserDataService} from '../services/user-data.service';
import {Roles} from '../models/roles';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserDataComponent implements OnInit {
  private userDataCollection: any;
  private inputImageUser: any;
  private msgError: any;
  private isError: boolean;
  private btnClose: any;
   roles: Roles;
   rolesList: string[];

  constructor(
    public userDataService: UserDataService,
    private authService: AuthService) {

  }

  allUserDatas: UserData[];
  isAdmin: any;
  userUid: string;

  ngOnInit() {
    this.getCurrentUser();
    this.getListUserDatas();
    this.roles={ admin:true,editor:true}
    this.rolesList = Object.keys(this.roles);
    console.log(this.rolesList);
    console.log(this.roles);
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService
          .isUserAdmin(this.userUid)
          .subscribe(userRole => {
            this.isAdmin = Object
              .assign({}, userRole.roles)
              .hasOwnProperty('admin');
          });
      }
    });
  }

  getListUserDatas() {
    this.userDataService.getAllUserData()
      .subscribe(UserDatas => {
        this.allUserDatas = UserDatas;
        console.log(this.allUserDatas);
      });

  }

  onDeleteUserData(idUserData: string): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.userDataService.deleteUserData(idUserData);
    }
  }

  onPreUpdateUserData(userData: UserData) {
    console.log('UserData', userData);
    this.userDataService.selectedUserData = {...userData};
    //this.userDataService.selectedUserData = Object.assign({}, userData);
    console.log('UserData', this.userDataService.selectedUserData);

  }

  createNewUserData(userData) {
    Object
      .keys(userData.value)
      .forEach(key => userData.value[key] === undefined ?
        userData.value[key] = '' : userData.value[key]);
    console.log('UserData', userData.value);

    //userData = {...['']};
    if (userData.value.id == null) {
      userData.value.userUid = this.userUid;
      //userData.value.portada = this.inputImageUser.nativeElement.value;
      this.userDataService.addUserData(userData.value)
        .then(() => {
          userData.resetForm();
          this.btnClose.nativeElement.click();
        })
        .catch(err => {
          this.isError = true;
          this.msgError = err.message;
        });
    } else {
      // Update
      //  userData.value.portada = this.inputImageUser.nativeElement.value;
      userData.value.userUid = this.userUid;

      this.userDataService.updateUserData(userData.value)
        .then(() => {
          userData.resetForm();
          this.btnClose.nativeElement.click();
        })
        .catch(err => {
          this.isError = true;
          this.msgError = err.message;
          console.log('error onSaveUserData() ::: ' + err.message);
        });

    }


  }

  resetSelectedUserData() {
    this.userDataService.selectedUserData = Object.assign({}, null);
    console.log('selected reset UserData', this.userDataService.selectedUserData);


  }
}
