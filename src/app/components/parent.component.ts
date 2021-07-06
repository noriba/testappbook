import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';

import {BreadcrumbService} from '../services/breadcrumb.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
})
export class ParentComponent implements OnInit {

  crumbs$: Observable<MenuItem[]>;
  breadcrumbsIn: Observable<MenuItem[]>;
  itemsModel: (
    { label: string; routerLink: string; disabled?: undefined; } |
    { label: string; routerLink: string; disabled: boolean; })[];


  items: MenuItem[];

  constructor(private breadcrumb: BreadcrumbService) {
  }

  ngOnInit() {

    this.breadcrumbsIn = this.breadcrumb.getCrumbs();
    this.crumbs$ = this.breadcrumb.crumbs$;

    console.log('MenuItem List crumbs$ : ' + this.crumbs$);
    console.log('MenuItem List breadcrumbsIn : ' + this.breadcrumbsIn);

  }

  time = new Observable<string>(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}
