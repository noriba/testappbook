import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {MenuItem, MessageService} from 'primeng/api';
import {BreadcrumbService} from '../services/breadcrumb.service';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-my-breadcrumbed-2',
  templateUrl: './my-breadcrumbed-2.component.html',
  providers: [MessageService]

})
export class MyBreadcrumbed2Component {
  crumbs$: Observable<MenuItem[]>;

  constructor(private breadservice: BreadcrumbService
  ) {


    console.log(':::::::::::::::::: MyBreadcrumbed2Component :::::::::::::::::::');

    this.crumbs$ = this.breadservice.getCrumbs();

    console.log('crumbs datas =' + JSON.stringify(this.breadservice.crumbs$));


  }

}
