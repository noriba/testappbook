import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from '../services/breadcrumb.service';

@Component({
  selector: 'app-my-breadcrumbed-2',
  templateUrl: './my-breadcrumbed-2.component.html',
})
export class MyBreadcrumbed2Component {
  crumbs$ : Observable<MenuItem[]>;
  constructor(private breadservice:BreadcrumbService) {
    console.log(":::::::::::::::::: MyBreadcrumbed2Component :::::::::::::::::::");

    this.crumbs$= this.breadservice.getCrumbs();

    console.log("crumbs datas ="+JSON.stringify(this.breadservice.crumbs$));


  }

}
