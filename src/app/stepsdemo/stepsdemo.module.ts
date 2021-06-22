import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {TicketService} from './ticketservice';
import {StepsdemoComponent} from './stepsdemo.component';
import {Breadcrumb} from 'primeng/breadcrumb';
import {StepsDemoRoutingModule} from './stepsdemo-routing.module';
import {StepsModule} from 'primeng/steps';
import {TabViewModule} from 'primeng/tabview';
import {Step2} from './step2';
import {Step4} from './step4';
import {Step1} from './step1';
import {Step3} from './step3';
import {RadioButtonModule} from 'primeng/radiobutton';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BreadcrumbComponent} from '../components/breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';


@NgModule({
  exports: [
    RouterModule,
    BreadcrumbComponent,
    BrowserAnimationsModule,
    RadioButtonModule,
    StepsdemoComponent,
    Step2,
    Step4,
    Step1,
    Step3
  ],
  imports: [
    RouterModule,
    RadioButtonModule,
    BrowserAnimationsModule,
    CommonModule,
    StepsDemoRoutingModule,
    StepsModule,
    TabViewModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    InputMaskModule,
    CheckboxModule,
    ToastModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BreadcrumbComponent,
    StepsdemoComponent,
    Step2,
    Step4,
    Step1,
    Step3
  ],
  providers: [
    TicketService
  ]
})
export class StepsDemoModule {
}
