import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.authenticationService.getUserValue();
    console.log(user);

    if (!user) {
      this.router.navigate(['/']);
      return false;
    }

    if (route.data['roles']?.indexOf(user?.role) < 0) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
