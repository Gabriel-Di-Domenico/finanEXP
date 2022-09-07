import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { take, Subscription } from 'rxjs';

import { UserCrudProxysService } from './../../../shared/proxys/userCrudProxys/user-crud-proxys.service';
import { AuthenticateProxyService } from './../../../shared/proxys/authenticateProxys/authenticate.proxy.service';
import JsonResult from '../../../shared/support/interfaces/JsonResult.interface';
import UserInput from '../../../shared/support/interfaces/userInput.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(
    private userCrudProxysService: UserCrudProxysService,
    private router: Router,
    private authenticateProxyService: AuthenticateProxyService
  ) { }

  registerNewUser(user: UserInput, callback?: Function): Subscription {
    return this.userCrudProxysService.createNewUserRequest(user)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: UserInput) => {
          this.authUser(user)
          if (callback) callback(null)
        },
        error: (err: HttpErrorResponse) => {
          if (callback) callback(err)
        }
      })
  }
  authUser(user: UserInput, callback?: Function): Subscription {
    return this.authenticateProxyService.authUserRequest(user)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: JsonResult) => {

          window.localStorage.setItem('fSSIdtkn', data.value)
          this.router.navigate(['home'])
          if (callback) callback(false)
        },
        error: (err: HttpErrorResponse) => { if (callback) callback(true) }
      })
  }
}
