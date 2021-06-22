import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import { Step4 } from './step4';
import { Step2 } from './step2';
import { Step3 } from './step3';
import { Step1 } from './step1';
import {StepsdemoComponent} from './stepsdemo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path:'',component: StepsdemoComponent, children:[
          {path:'', redirectTo: 'stepsdemo', pathMatch: 'full'},
          {path: 'step1', component: Step1},
          {path: 'step4', component: Step4},
          {path: 'step2', component: Step2},
          {path: 'stepsdemo', component: StepsdemoComponent},
          {path: 'step3', component: Step3}
        ]}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class StepsDemoRoutingModule {}
