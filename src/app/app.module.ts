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
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireStorageModule} from '@angular/fire/storage/storage.module';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth/auth';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {environment} from '../environments/environment';
import {TimesheetComponent} from './components/timesheet/timesheet.component';
import {StepsdemoComponent} from './stepsdemo/stepsdemo.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';
import * as i3 from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {InputMaskModule} from 'primeng/inputmask';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import {TreeTableModule} from 'primeng/treetable';
import {Dropdown, DropdownModule} from 'primeng/dropdown';
import {Calendar, CalendarModule} from 'primeng/calendar';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {TreeModule} from 'primeng/tree';
import {RouterModule} from '@angular/router';
import {DataViewModule} from 'primeng/dataview';
import {BreadcrumbService} from './services/breadcrumb.service';
import {BreadcrumbInitializedGuard} from './guards/breadcrumbInitialized.guard';
import {MenuItem, MessageService} from 'primeng/api';

import { ReactiveComponentModule } from '@ngrx/component';
import {Step1} from './stepsdemo/step1';
import {Step2} from './stepsdemo/step2';
import {Step3} from './stepsdemo/step3';
import {Step4} from './stepsdemo/step4';
import {ParentComponent} from './components/parent.component';
import {MyBreadcrumbed2Component} from './components/my-breadcrumbed-2.component';
import {MyBreadcrumbedComponent} from './components/my-breadcrumbed.component';
import {FileTreeComponent} from './components/file-tree.component';
import {DataTableComponent} from './components/data-table.component';
import {StepComponent, StepsComponent, WizardModule} from './components/breadcrumb/wizard.module';



@NgModule({
  declarations: [

    DataTableComponent,
    FileTreeComponent,
    MyBreadcrumbed2Component,
    MyBreadcrumbedComponent,
    ParentComponent,
    Step1,
    Step2,
    Step3,
    Step4,
    StepsdemoComponent,
    BreadcrumbComponent,
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
    WizardModule,
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
    TabViewModule,
    CardModule,
    StepsModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    TreeTableModule
  ],
  exports:[
    WizardModule,

    StepsComponent,
    StepComponent],
  providers: [AngularFireAuth, AngularFirestore, AngularFireStorage, NgbModal, NgbModalConfig,BreadcrumbComponent,    StepComponent,StepsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
