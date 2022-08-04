import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

function verifyToken() {

}
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
    return this.http.post('http://localhost:51235/verifyToken', { token }).pipe(
      tap((resposta) => {
        
      }, (err) => {
        this.router.navigate(['auth'])
      }));

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
