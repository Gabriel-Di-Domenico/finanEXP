import { AuthenticateProxyService } from './../../../proxys/authenticateProxys/authenticate.proxy.service';
import { Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import IVerifyTokenService from './IVerify-token.service.interface';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenService implements IVerifyTokenService {
  constructor(
    private router: Router,
    private authenticateProxyService:AuthenticateProxyService
  ) { }
  verifyToken(): Observable<any> {
    return this.authenticateProxyService.verifyTokenRequest()
      .pipe(
        tap({
          error: (e: HttpErrorResponse) => {
            this.router.navigate(['auth'])
          }
        })
      );
  }
}
