import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';

import {BreadcrumbService} from '../services/breadcrumb.service';
import {MenuItem} from 'primeng/api';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
//  template: `    <p-breadcrumb [model]=""></p-breadcrumb>  `
})
export class ParentComponent implements OnInit {
  crumbs$: Observable<MenuItem[]>;
   breadcrumbsIn: Observable<MenuItem[]>;
  itemsModel: (
    { label: string; routerLink: string; disabled?: undefined; } |
    { label: string; routerLink: string; disabled: boolean; })[];


  items: MenuItem[];

  constructor(private breadcrumb: BreadcrumbService) { }

  ngOnInit() {

  /*  this.items = [
      {label: 'Home', routerLink: '/'},
      {label: 'Tab1',  routerLink: '/tab1'},
      {label: 'Tab2',  routerLink: '/tab2'},
      {label: 'Tab3',  routerLink: '/tab3'},
    ];*/
   // console.log("MenuItem List exemple : "+ this.items)
   // console.log("MenuItem List exemple : "+ this.items)
    // this.crumbs$ = Observable.create(observer => {
    //   this.breadcrumb.crumbs$;
    // });
    // this.crumbs$.subscribe(value => this.crumbs = value);

    this.breadcrumbsIn = this.breadcrumb.getCrumbs()
    this.crumbs$ = this.breadcrumb.crumbs$;

    console.log("MenuItem List crumbs$ : "+ this.crumbs$)
    console.log("MenuItem List breadcrumbsIn : "+ this.breadcrumbsIn)


  }

  time = new Observable<string>(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}
