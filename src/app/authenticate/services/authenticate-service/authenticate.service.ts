import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { take } from 'rxjs';

import { AuthenticateProxyService } from './../../../shared/proxys/authenticateProxys/authenticate.proxy.service';

import IAuthenticateService from './IAuthenticate.service.interface';
import { ResponseAuthUserDto } from 'src/app/shared/support/classes/responseAuthUserDto';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { UserProxysService } from 'src/app/shared/proxys/userProxys/user-proxys.service';
import { UserInput } from 'src/app/shared/support/interfaces/user/userInput.interface';
import { Message } from 'src/app/shared/support/interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService implements IAuthenticateService {
  constructor(
    private userProxysService: UserProxysService,
    private router: Router,
    private authenticateProxyService: AuthenticateProxyService
  ) { }

  createNewUser(user: UserInput, callback?: (data:Message) => void): void {
    this.userProxysService.createNewUserRequest(user)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: ResponseDto) => {
          this.authUser(user);
          if (callback) callback(data.message);
        },
        error: (err: HttpErrorResponse) => {
          if (callback) callback(err.error.message);
        }
      });
  }
  authUser(user: UserInput, callback?: (data:Message) => void): void {
    this.authenticateProxyService.authUserRequest(user)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: ResponseAuthUserDto) => {
          window.localStorage.setItem('fSSIdtkn', data.jwt);

          this.router.navigate(['home']);

          if (callback) callback(data.message);
        },
        error: (err: HttpErrorResponse) => callback ? callback(err.error.message) : ''
      });
  }
}
