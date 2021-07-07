import {Injectable} from '@angular/core';
import {map, take, tap} from 'rxjs/internal/operators';
import {AngularFireAuth} from '@angular/fire/auth/auth';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afsAuth: AngularFireAuth, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        console.log("GUARD" + auth);

        if (!auth ) {
          console.log("GUARD" + auth);
          this.router.navigate(['/user/login']);
        }
      }));
  }
}
