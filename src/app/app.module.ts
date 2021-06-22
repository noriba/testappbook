import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListBooksComponent} from './components/admin/list-books/list-books.component';
import {DetailsBookComponent} from './components/details-book/details-book.component';
import {HeroComponent} from './components/hero/hero.component';
import {HomeComponent} from './components/home/home.component';
import {ModalComponent} from './components/modal/modal.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {OffersComponent} from './components/offers/offers.component';
import {LoginComponent} from './components/users/login/login.component';
import {ProfileComponent} from './components/users/profile/profile.component';
import {RegisterComponent} from './components/users/register/register.component';
import {Page404Component} from './components/page404/page404.component';
import {MyBooksComponent} from './components/my-books/my-books.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage/storage.module';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from '@angular/fire';
import {NgModule} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {environment} from '../environments/environment';
import {TimesheetComponent} from './components/timesheet/timesheet.component';
import {StepsdemoComponent} from './stepsdemo/stepsdemo.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';
import * as i3 from '@angular/cdk/scrolling';
import {StepsDemoModule} from './stepsdemo/stepsdemo.module';
import {CommonModule} from '@angular/common';
import {StepsDemoRoutingModule} from './stepsdemo/stepsdemo-routing.module';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {InputMaskModule} from 'primeng/inputmask';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import {TreeTableModule} from 'primeng/treetable';
import {Dropdown, DropdownModule} from 'primeng/dropdown';
import {Calendar, CalendarModule} from 'primeng/calendar';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {TreeModule} from 'primeng/tree';
import {PrimeNgModule} from './components/prime-ng.module';
import {RouterModule} from '@angular/router';
import {DataViewModule} from 'primeng/dataview';
import {BreadcrumbService} from './services/breadcrumb.service';
import {BreadcrumbInitializedGuard} from './guards/breadcrumbInitialized.guard';

import { ReactiveComponentModule } from '@ngrx/component';



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
    ReactiveComponentModule,
    DataViewModule,
    CommonModule,
    ToastModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    StepsDemoModule,
    StepsDemoRoutingModule,
    TabViewModule,
    CardModule,
    StepsModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    TreeTableModule,
    TreeTableModule,
    PrimeNgModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    ToastModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    StepsDemoModule,
    StepsDemoRoutingModule,
    TabViewModule,
    CardModule,
    StepsModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    TreeModule,
    TreeTableModule
  ],
  providers: [AngularFireAuth, AngularFirestore, AngularFireStorage, NgbModal, NgbModalConfig],
  bootstrap: [AppComponent]
})
export class AppModule {
}
