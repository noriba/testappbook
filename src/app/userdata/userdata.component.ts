import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserData} from '../models/userdata';
import {UserDataService} from '../services/user-data.service';
import {Roles} from '../models/roles';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  private subscription: Subscription;

  constructor(
    public userDataService: UserDataService,
    private authService: AuthService) {

  }

  allUserDatas: UserData[];

  isLogged=new BehaviorSubject<boolean>(false) ;
  isAdmin= new BehaviorSubject<boolean>(false);
  userUid=new BehaviorSubject<string>(null);

  ngOnInit() {
    this.isLogged.next(this.authService.isLogged.getValue());
    this.userUid .next( this.authService.userUid.getValue());
    this.authService.isAdmin.subscribe(admin=> {
      !admin?this.getMyUserData(this.userUid.getValue()):this.getListUserDatas();

      return this.isAdmin.next(admin);
    })

    //this.isAdmin.next(this.authService.isAdmin.getValue());




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
    this.subscription=this.userDataService.getAllUserData()
      .pipe(takeUntil(this.authService._loggedOutEmitter))
      .subscribe(User => {
        this.allUserDatas = User;
        console.log(this.allUserDatas);
      },err => console.log("error",err));
  }

  onDeleteUserData(idUserData: string): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      console.log("deleting...",idUserData)
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
    console.log('Userid ', this.userUid.value);

    //userData = {...['']};
    if (userData.value.id == null) {
      userData.value.userUid = this.userUid.value;
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
          //userData.resetForm();
        })
        .catch(err => {
          this.isError = true;
          this.msgError = err.message;
          console.error('error onSaveUserData() ::: ' + err.message);
        });
    }


  }

  resetSelectedUserData() {
    this.userDataService.selectedUserData = Object.assign({}, null);
    console.log('selected reset UserData', this.userDataService.selectedUserData);
  }

  getMyUserData(userid) {
    this.subscription=this.userDataService.getMyUserData(userid)
      .pipe(takeUntil(this.authService._loggedOutEmitter))
      .subscribe(userData => {
      console.log("my user id "+userid);
      console.log("my user data "+JSON.stringify(userData));
      this.userDataService.selectedUserData = userData;
    },err => console.error("error",err));
  }



}
