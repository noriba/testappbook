import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {UserDataService} from '../../../services/user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
//import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fb: string;

  constructor(private router: Router,
              private authService: AuthService,
              public userDataService: UserDataService,
              private formBuilder: FormBuilder,
              private storage: AngularFireStorage) {
  }
  @ViewChild('formRegister') ngForm: NgForm;

  @ViewChild('imageUser') inputImageUser: ElementRef;
  submitted = false;

  public email: string = '';
  public password: string = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  msgError: any;
  isError: any;

  ngOnInit() {

  }


  imageLoad: any = {
    id: '',
    file: '',
    filePath: '',
    ref: '',
    task: ''
  };
  get f() { return this.ngForm.controls; }


  onUpload(event) {
    this.imageLoad.id = Math.random().toString(36).substring(2);
    this.imageLoad.file = event.target.files[0];
    this.imageLoad.filePath = `uploads/profile_${this.imageLoad.id}`;
    this.imageLoad.ref = this.storage.ref(this.imageLoad.filePath);
    this.imageLoad.task = this.storage.upload(this.imageLoad.filePath, this.imageLoad.file);
    try {
      this.uploadPercent = this.imageLoad.task.percentageChanges();
      this.imageLoad.task.snapshotChanges()
        .pipe(finalize(() => this.urlImage = this.imageLoad.ref.getDownloadURL()))
        .subscribe();
      console.log('submit image');
    } catch (error) {
      this.msgError = error;
      console.log('Error in load image' + error);
    }
  }

  onAddUser(formRegister) {

    this.submitted = true;

    console.log(formRegister.value.email);
    console.log(formRegister.value.password);
    this.authService.registerUser(formRegister.value.email, formRegister.value.password)
      .then((res) => {
        console.log('nouveau firebase User ::: ' + JSON.stringify(res));


        this.authService.isAuth().subscribe(user => {
          if (user) {

            console.log('mettre a jour ::: ' + user.uid);
            console.log('mettre a jour ::: ' + formRegister.value);
            console.log('mettre a jour ::: ' + JSON.stringify(formRegister.value));

            formRegister.value.userUid = user.uid;
            formRegister.value.photoUrl = this.inputImageUser.nativeElement.value;
            //userData.value.portada = this.inputImageUser.nativeElement.value;
            this.userDataService.updateUserData(formRegister.value)
              .then((res) => {
                console.log('addUserData res ::: ' + res);

                formRegister.resetForm();
              })
              .catch(err => {
                console.log('error registration ::: ' + err);
                this.imageLoad.task = this.storage.ref(this.imageLoad.filePath).delete();

                this.isError = true;
                this.msgError = err.message;
              });


            user.updateProfile({
              displayName: formRegister.value.firstname + ' '+ formRegister.value.lastname,
              photoURL: this.inputImageUser.nativeElement.value
            }).then(() => {
              console.log('onAddUser ::: userData = ' + user.photoURL);

              this.router.navigate(['timesheet']);
            }).catch((error) => {
              this.msgError = error;
              console.log('error', error);
            });
          }
        });
      }).catch(err => {
      this.msgError = err;
      console.log('err', err.message);
    });
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => {
      this.msgError = err;

      console.log('err', err.message);
    });
  }

  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => {
      this.msgError = err;
      console.log('err', err.message);
    });
  }

  onLoginRedirect(): void {
    this.router.navigate(['timesheet']);
  }

}
