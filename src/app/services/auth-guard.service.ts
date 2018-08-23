import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

/**
 * @description This service is responsible to disallow the user from viewing the protected route, in this case, the home page unless user logs in successfully.
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate() {
    if (localStorage.getItem('username') && localStorage.getItem('token')) {
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }

}
