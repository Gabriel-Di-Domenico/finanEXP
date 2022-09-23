import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { take } from 'rxjs';

import { UserCrudProxysService } from './../../../shared/proxys/userCrudProxys/user-crud-proxys.service';
import { AuthenticateProxyService } from './../../../shared/proxys/authenticateProxys/authenticate.proxy.service';
import JsonResult from '../../../shared/support/interfaces/JsonResult.interface';
import UserInput from '../../../shared/support/interfaces/userInput.interface';
import IAuthenticateService from './IAuthenticate.service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService implements IAuthenticateService {
  constructor(
    private userCrudProxysService: UserCrudProxysService,
    private router: Router,
    private authenticateProxyService: AuthenticateProxyService
  ) { }

  createNewUser(user: UserInput, callback?: (err?: HttpErrorResponse) => void): void {
    this.userCrudProxysService.createNewUserRequest(user)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: UserInput) => {
          this.authUser(user)

          if (callback) callback()
        },
        error: (err: HttpErrorResponse) => {
          if (callback) callback(err)
        }
      })
  }
  authUser(user: UserInput, callback?: (err?: HttpErrorResponse) => void): void {
    this.authenticateProxyService.authUserRequest(user)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: JsonResult) => {

          window.localStorage.setItem('fSSIdtkn', data.value)
          
          this.router.navigate(['home'])
          if (callback) callback()
        },
        error: (err: HttpErrorResponse) => { if (callback) callback(err) }
      })
  }
}
