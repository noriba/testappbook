import {OffersComponent} from 'src/app/components/offers/offers.component';
import {DetailsBookComponent} from './components/details-book/details-book.component';
import {LoginComponent} from 'src/app/components/users/login/login.component';
import {RegisterComponent} from 'src/app/components/users/register/register.component';
import {ProfileComponent} from 'src/app/components/users/profile/profile.component';
import {Page404Component} from './components/page404/page404.component';
import {AuthGuard} from './guards/auth.guard';
import {MyBooksComponent} from './components/my-books/my-books.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TimesheetComponent} from './components/timesheet/timesheet.component';
import {StepsdemoComponent} from './stepsdemo/stepsdemo.component';
import {Step1} from './components/timesheet/step1';
import {Step3} from './components/timesheet/step3';
import {Step4} from './components/timesheet/step4';
import {Step2} from './components/timesheet/step2';
import {BreadcrumbInitializedGuard} from './guards/breadcrumbInitialized.guard';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {UserDataComponent} from './userdata/userdata.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'template', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'offers', component: OffersComponent, canActivate: [AuthGuard]},
  {path: 'book/:id', component: DetailsBookComponent, canActivate: [AuthGuard]},
  {path: 'userdata', component: UserDataComponent, canActivate: [AuthGuard]},
  {path: 'my-books', component: MyBooksComponent, canActivate: [AuthGuard]},
  {path: 'timesheet', component: TimesheetComponent, canActivate: [AuthGuard]},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'stepsdemo', component: StepsdemoComponent, canActivate: [AuthGuard]},
  {path: 'step1', component: Step1, canActivate: [AuthGuard]},
  {path: 'step2', component: Step2, canActivate: [AuthGuard]},
  {path: 'step3', component: Step3, canActivate: [AuthGuard]},
  {path: 'step4', component: Step4, canActivate: [AuthGuard]},
  {path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]},
   {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
