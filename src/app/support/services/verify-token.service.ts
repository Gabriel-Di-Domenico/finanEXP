import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenService {

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }
  verifyToken(): Observable<any> {
    const token = window.localStorage.getItem('fSSIdtkn')

    const httpHeaders: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` })
    return this.http.get('http://localhost:51235/auth/verifyToken', { headers: httpHeaders }).pipe(
      tap({
        error: (e: HttpErrorResponse) => {
          this.router.navigate(['auth'])
        }
      }
      ));

  }
}
