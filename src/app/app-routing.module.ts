import {HomeComponent} from './components/home/home.component';
import {OffersComponent} from 'src/app/components/offers/offers.component';
import {DetailsBookComponent} from './components/details-book/details-book.component';
import {ListBooksComponent} from './components/admin/list-books/list-books.component';
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
import {DataTableComponent} from './components/data-table.component';
import {ParentComponent} from './components/parent.component';
import {FileTreeComponent} from './components/file-tree.component';
import {MyBreadcrumbedComponent} from './components/my-breadcrumbed.component';
import {MyBreadcrumbed2Component} from './components/my-breadcrumbed-2.component';
import {BreadcrumbInitializedGuard} from './guards/breadcrumbInitialized.guard';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {StepComponent, StepsComponent} from './components/breadcrumb/wizard.module';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'offers', component: OffersComponent, canActivate: [AuthGuard]},
  {path: 'book/:id', component: DetailsBookComponent},
  {path: 'admin/list-books', component: ListBooksComponent, canActivate: [AuthGuard]},
  {path: 'my-books', component: MyBooksComponent, canActivate: [AuthGuard]},
  {path: 'timesheet', component: TimesheetComponent, canActivate: [AuthGuard]},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'stepsdemo', component: StepsdemoComponent},
  {path: 'step1', component: Step1},
  {path: 'step3', component: Step3},
  {path: 'step4', component: Step4},
  {path: 'step2', component: Step2},
  {path: 'step', component: StepComponent},
  {path: 'steps', component: StepsComponent},
  {path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'data-table', component: DataTableComponent},
  {    path: 'data-table', component: DataTableComponent  },
  {    path: 'step', component: BreadcrumbComponent  },
  {    path: 'prime', component: ParentComponent,
    children: [{
      path: 'file-tree', component: FileTreeComponent  }, {
      path: 'breadcrumb', component: MyBreadcrumbedComponent    }, {
      path: 'breadcrumb2', component: MyBreadcrumbed2Component, canActivate: [BreadcrumbInitializedGuard], data: {
        crumbs: [
          {label: 'Home', routerLink: '/'},
          {label: 'Tab1', routerLink: '/tab1'},
          {label: 'Tab2', routerLink: '/tab2'},
          {label: 'Tab2', routerLink: '/tab2'},
          {label: 'Tab2', routerLink: '/tab2'},
          {label: 'Tab2', routerLink: '/tab2'},
          {label: 'Tab3', routerLink: '/tab3'},
        ]
      }
    }],
  },
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
