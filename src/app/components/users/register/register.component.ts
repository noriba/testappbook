import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    fb: string;

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;

  public email: string  = '';
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
  }


  onUpload(event) {
    this.imageLoad.id = Math.random().toString(36).substring(2);
    this.imageLoad.file = event.target.files[0];
    this.imageLoad.filePath = `uploads/profile_${this.imageLoad.id}`;
    this.imageLoad.ref = this.storage.ref(this.imageLoad.filePath);
    this.imageLoad.task = this.storage.upload(this.imageLoad.filePath, this.imageLoad.file);
    try{
      this.uploadPercent = this.imageLoad.task.percentageChanges();
      this.imageLoad.task.snapshotChanges()
        .pipe(finalize(() => this.urlImage = this.imageLoad.ref.getDownloadURL()))
        .subscribe();
      console.log('Subió imagen')
    }catch (error){
      this.msgError = error;
      console.log("Error in load image"+ error);
    }
  }

  onAddUser() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.authService.isAuth().subscribe(user => {
          if (user) {
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImageUser.nativeElement.value
            }).then(() => {
              console.log("onAddUser ::: userData = "+ user.photoURL);

              this.router.navigate(['admin/list-books']);
            }).catch((error) =>{
              this.msgError = error;
              console.log('error', error)
            });
          }
        });
      }).catch(err => {
      this.msgError = err;
      console.log('err', err.message)
    });
  }
  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => {
      this.msgError = err;

      console.log('err', err.message)
    });
  }
  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => {
      this.msgError = err;
      console.log('err', err.message)
    });
  }

  onLoginRedirect(): void {
    this.router.navigate(['timesheet']);
  }

}
