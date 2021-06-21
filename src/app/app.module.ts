import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListBooksComponent } from './components/admin/list-books/list-books.component';
import { DetailsBookComponent } from './components/details-book/details-book.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OffersComponent } from './components/offers/offers.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import {MyBooksComponent} from './components/my-books/my-books.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage/storage.module';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from '@angular/fire';
import {NgModule} from "@angular/core";
import {AngularFireAuth} from '@angular/fire/auth/auth';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {environment} from '../environments/environment';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import {AngularFireStorage} from '@angular/fire/storage';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { RadioButtonModule } from "primeng/radiobutton";
import { DropdownModule } from "primeng/dropdown";
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import * as i3 from "@angular/cdk/scrolling";


@NgModule({
  declarations: [
    AppComponent,
    ListBooksComponent,
    DetailsBookComponent,
    HeroComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    OffersComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    MyBooksComponent,
    TimesheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [AngularFireAuth, AngularFirestore, AngularFireStorage, NgbModal, NgbModalConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
