import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { Observable } from 'rxjs';
import { VerifyTokenService } from '../shared/services/verifyToken/verify-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private verifyTokenService: VerifyTokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | boolean {
    return this.verifyTokenService.verifyToken();
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<any> {
    return this.verifyTokenService.verifyToken();
  }
}
