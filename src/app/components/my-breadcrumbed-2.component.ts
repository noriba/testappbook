import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';
import {BreadcrumbService} from '../services/breadcrumb.service';

@Component({
  selector: 'app-my-breadcrumbed-2',
  templateUrl: './my-breadcrumbed-2.component.html',
  providers: [MessageService]

})
export class MyBreadcrumbed2Component {
  crumbs$: any;

  //crumbs$: Observable<MenuItem[]>;

  constructor(private breadservice: BreadcrumbService
  ) {


    console.log(':::::::::::::::::: MyBreadcrumbed2Component :::::::::::::::::::');

    this.crumbs$ = this.breadservice.getCrumbs();

    //console.log('crumbs datas =' + JSON.stringify(this.breadservice.crumbs$));


  }

}
