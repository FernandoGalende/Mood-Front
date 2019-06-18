import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HrGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._auth.isAuthenticated() && this.belongsToHR()) {
      return true;
    }
    this._router.navigate(['']);
    return false;
  }

  belongsToHR() {
    const { groups } = this._auth.getUserInfo()['https://mood.payvision.app/'];
    return groups && groups.includes('HR');
  }
}
