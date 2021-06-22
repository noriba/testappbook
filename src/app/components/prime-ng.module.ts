import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ParentComponent} from './parent.component';
import {FileTreeComponent} from './file-tree.component';
import {MyBreadcrumbedComponent} from './my-breadcrumbed.component';
import {MyBreadcrumbed2Component} from './my-breadcrumbed-2.component';
import {DataTableComponent} from './data-table.component';
import {BreadcrumbService} from '../services/breadcrumb.service';
import {BreadcrumbInitializedGuard} from '../guards/breadcrumbInitialized.guard';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {DropdownModule} from 'primeng/dropdown';
import {TreeModule} from 'primeng/tree';
import {CalendarModule} from 'primeng/calendar';
import {TreeTableModule} from 'primeng/treetable';
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import { ReactiveComponentModule } from '@ngrx/component';



const ngroutes: Routes = [
  {    path: 'data-table', component: DataTableComponent  },
  {
    path: 'prime', component: ParentComponent,    children: [{
      path: 'file-tree', component: FileTreeComponent  }, {
      path: 'breadcrumb', component: MyBreadcrumbedComponent
    }, {
      path: 'breadcrumb2', component: MyBreadcrumbed2Component, canActivate: [BreadcrumbInitializedGuard], data: {
        crumbs: [
          {label: 'Step 1'},
          {label: 'Step 2'},
          {label: 'Step 3'}
        ]
      }
    }],
  }
];

@NgModule({
  exports: [
    RouterModule,
    BreadcrumbModule,
    DropdownModule,
    FormsModule,
    TreeTableModule,
    TreeModule,
    CalendarModule],
  imports: [
    ReactiveComponentModule,

    DataViewModule,
    TableModule,
    RouterModule.forChild(ngroutes),
    BreadcrumbModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    TreeTableModule,
    TreeModule,
    CalendarModule
  ],
  declarations: [
    ParentComponent,
    FileTreeComponent,
    MyBreadcrumbedComponent,
    MyBreadcrumbed2Component,
    DataTableComponent
  ],
  providers: [
    BreadcrumbService,
    BreadcrumbInitializedGuard
  ]
})
export class PrimeNgModule {
}
