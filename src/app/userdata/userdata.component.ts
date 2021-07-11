import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserData} from '../models/userdata';
import {UserDataService} from '../services/user-data.service';
import {Roles} from '../models/roles';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserDataComponent implements OnInit {
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

  isLogged: Observable<boolean> ;
  isAdmin: Observable<boolean>;
  userUid: Observable<string>;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin.pipe();
    this.isLogged = this.authService.isLogged.pipe();
    this.userUid = this.authService.userUid.pipe();

    !this.isAdmin?this.getMyUserData(this.userUid):this.getListUserDatas();


    this.roles={ admin:true,editor:true}
    this.rolesList = Object.keys(this.roles);
    console.log(this.rolesList);
    console.log(this.roles);
  }

/*  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      console.log("get current auth", auth)
      console.log("get current uid",auth.uid)
      if (auth) {
        this.userUid.next(auth.uid);
        this.authService
          .isUserAdmin( auth.uid)
          .subscribe(userRole => {
            this.isAdmin = Object
              .assign({}, userRole.roles)
              .hasOwnProperty('admin');
            this.isAdmin?this.getListUserDatas():this.getMyUserData(this.userUid);
          },err => console.log("error",err));
      }
    },err => console.log("error",err));
  }*/

  getListUserDatas() {
    this.userDataService.getAllUserData()
      .subscribe(UserDatas => {
        this.allUserDatas = UserDatas;
        console.log(this.allUserDatas);
      },err => console.log("error",err));
  }

  onDeleteUserData(idUserData: string): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.userDataService.deleteUserData(idUserData);
    }
  }

  onPreUpdateUserData(userData: UserData) {
    console.log('UserData on preupdate', userData);
    this.userDataService.selectedUserData = {...userData};
    //this.userDataService.selectedUserData = Object.assign({}, userData);
    console.log('UserData', this.userDataService.selectedUserData);
  }

  createNewUserData(userData) {
    Object
      .keys(userData.value)
      .forEach(key => userData.value[key] === undefined ?
        userData.value[key] = '': true );
    console.log('UserData with replaced undefined values', userData.value);

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
      //userData.value.userUid = this.userUid;

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

  getMyUserData(userid) {
    this.userDataService.getMyUserData(userid).subscribe(userData => {
      console.log("my user id "+userid);
      console.log("my user data "+userData);
      this.userDataService.selectedUserData = userData;
    },err => console.log("error",err));
  }
}
