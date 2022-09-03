import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private http: HttpClient) {
  }
  verifyToken(): Observable<any> {
    const token = window.localStorage.getItem('fSSIdtkn')
    
    const httpHeaders: HttpHeaders = new HttpHeaders({Authorization:`Bearer ${token}`})
    return this.http.get('http://localhost:51235/auth/verifyToken', { headers: httpHeaders }).pipe(
      tap({
        error: (e : HttpErrorResponse) => {
          this.router.navigate(['auth'])
        }
      }
      ));

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | boolean {
    return this.verifyToken()
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<any> {
    return this.verifyToken()
  }


}
