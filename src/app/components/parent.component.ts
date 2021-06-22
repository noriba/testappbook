import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';

import {BreadcrumbService} from '../services/breadcrumb.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
})
export class ParentComponent implements OnInit {
  crumbs$: Observable<MenuItem[]>;

  constructor(private breadcrumb: BreadcrumbService) { }

  ngOnInit() {
    // this.crumbs$ = Observable.create(observer => {
    //   this.breadcrumb.crumbs$;
    // });
    // this.crumbs$.subscribe(value => this.crumbs = value);


    this.crumbs$ = this.breadcrumb.crumbs$;
  }

  time = new Observable<string>(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}
