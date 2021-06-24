import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private crumbs: ReplaySubject<MenuItem[]>;
  crumbs$: Observable<MenuItem[]>;
  crumbs2$: any;

  constructor() {
    console.log(':::::::::::::::::: BreadcrumbService construction :::::::::::::::::::');

    this.crumbs = new ReplaySubject<MenuItem[]>();
    this.crumbs$ = this.crumbs.asObservable();
  }

  setCrumbs(items: MenuItem[]) {
    console.log(':::::::::::::::::: BreadcrumbService :::::::::::::::::::');

    this.crumbs.subscribe()
   // this.crumbs.subscribe(x=> {console.log('crumbs datas 1 =' +JSON.stringify(x))});
    this.crumbs.next(items);
    /*    (items || []).map(item => {
           const data = Object.assign({}, item, {
                       routerLinkActiveOptions: { exact: true }});

           return data;
         })
       ); */
    console.log('items datas =' + this.crumbs$);
    //console.log('crumbs datas =' + JSON.stringify(this.crumbs.observers));
   // this.crumbs$.subscribe(x=>console.log('crumbs datas 2 =' +x));
   // this.crumbs.next(items);

    //this.crumbs.next();
  }

  getCrumbs() {
    return this.crumbs$;
  }
}
