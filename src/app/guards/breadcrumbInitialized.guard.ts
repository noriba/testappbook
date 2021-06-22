import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {BreadcrumbService} from '../services/breadcrumb.service';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbInitializedGuard implements CanActivate {

  constructor(private service: BreadcrumbService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    debugger;
    console.log("-------------- GUARD ACTIVATED --------------")
    const crumbs = route.data['crumbs'];
    this.service.setCrumbs(crumbs);
    return true;
  }
}
