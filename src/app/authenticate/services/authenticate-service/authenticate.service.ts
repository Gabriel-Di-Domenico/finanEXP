
import Message from 'src/app/shared/support/interfaces/message.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { take } from 'rxjs';

import { UserCrudProxysService } from '../../../shared/proxys/userCrudProxys/user-crud.proxys.service';
import { AuthenticateProxyService } from './../../../shared/proxys/authenticateProxys/authenticate.proxy.service';
import JsonResult from '../../../shared/support/interfaces/JsonResult.interface';
import UserInput from '../../../shared/support/interfaces/userInput.interface';
import IAuthenticateService from './IAuthenticate.service.interface';
import ResponseAuthUserDto from 'src/app/shared/support/classes/responseAuthUserDto';
import ResponseDto from 'src/app/shared/support/classes/responseDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService implements IAuthenticateService {
  constructor(
    private userCrudProxysService: UserCrudProxysService,
    private router: Router,
    private authenticateProxyService: AuthenticateProxyService
  ) { }

  createNewUser(user: UserInput, callback?: Function): void {
    this.userCrudProxysService.createNewUserRequest(user)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: ResponseDto) => {
          this.authUser(user)
          if (callback) callback(data.message)
        },
        error: (err: HttpErrorResponse) => {
          if (callback) callback(err.error.message)
        }
      })
  }
  authUser(user: UserInput, callback?: Function): void {
    this.authenticateProxyService.authUserRequest(user)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: ResponseAuthUserDto) => {
          window.localStorage.setItem('fSSIdtkn', data.jwt)

          this.router.navigate(['home'])

          if (callback) callback(data.message);
        },
        error: (err: HttpErrorResponse) => callback ? callback(err.error.message) : ''
      })
  }
}
