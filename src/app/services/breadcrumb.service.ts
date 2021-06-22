import {Component, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private crumbs: Subject<MenuItem[]>;
  crumbs$: Observable<MenuItem[]>;

  constructor() {
    this.crumbs = new Subject<MenuItem[]>();
    this.crumbs$ = this.crumbs.asObservable();
  }

  setCrumbs(items: MenuItem[]) {
    debugger;
    this.crumbs.next(
      (items || []).map(item => {
        debugger;
        return Object.assign({}, item, {
          routerLinkActiveOptions: {exact: true}
        });
      })
    ); debugger;
    console.log(this.crumbs);
  }
}
