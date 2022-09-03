import { Router } from '@angular/router';
import JsonResult from '../../../../support/interfaces/JsonResult.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../../support/interfaces/user.interface';
import { AuthenticateProxyService } from './../../../proxys/authenticateProxys/authenticate.proxy.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(
    private httpClient: HttpClient,
    private authenticateProxyService: AuthenticateProxyService,
    private router: Router
  ) { }

  registerNewUser(user: User, callback?: Function): Subscription {
    return this.authenticateProxyService.registerNewUserRequest(user).subscribe({
      next: (data: User) => {
        this.authUser(user)
        if (callback) callback(null)
      },
      error: (err: HttpErrorResponse) => {
        if (callback) callback(err)
      }
    })
  }
  authUser(user: User, callback?: Function): Subscription {
    return this.authenticateProxyService.authUserRequest(user).subscribe({
      next: (data: JsonResult) => {

        window.localStorage.setItem('fSSIdtkn', data.value)
        this.router.navigate(['home'])
        if (callback) callback(false)
      },
      error: (err: HttpErrorResponse) => { if (callback) callback(true) }
    })
  }
}
