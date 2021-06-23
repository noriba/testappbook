import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private crumbs: ReplaySubject<MenuItem[]>;
  crumbs$: Observable<MenuItem[]>;

  constructor() {
    this.crumbs = new ReplaySubject<MenuItem[]>();

    this.crumbs$ = this.crumbs.asObservable();
  }

  setCrumbs(items: MenuItem[]) {
    debugger
    this.crumbs.next(items);
    /*    (items || []).map(item => {
           const data = Object.assign({}, item, {
                       routerLinkActiveOptions: { exact: true }});

           return data;
         })
       ); */
    console.log(':::::::::::::::::: BreadcrumbService :::::::::::::::::::');


    console.log('items datas =' + JSON.stringify(items));
    console.log('crumbs datas =' + JSON.stringify(this.crumbs.observers));


  }

  getCrumbs() {
    return this.crumbs.asObservable();
  }
}
