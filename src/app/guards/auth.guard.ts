import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

function verifyToken() {

}
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {

  }
  verifyToken(): boolean {
    const token = window.localStorage.getItem('token')
    if (token) {
      return true
    } else {
      this.router.navigate(['auth'])
      return false
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    return this.verifyToken()
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    
    return this.verifyToken()
  }


}
