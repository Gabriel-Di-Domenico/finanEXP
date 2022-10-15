import UserInput from '../../../../../shared/support/interfaces/user/userInput.interface';
import { UserProxysService } from '../../../../../shared/proxys/userProxys/user-proxys.service';

import ResponseDto from 'src/app/shared/support/classes/responseDto';
import { take } from 'rxjs';

import { Injectable } from '@angular/core';
import ISecurityService from './ISecurity.service.interface';
import { HttpErrorResponse } from '@angular/common/http';
import Message from 'src/app/shared/support/interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class SecurityService implements ISecurityService {
  constructor(
    private userProxysService: UserProxysService
  ) {}
  public updateUserPassword(userId: string, user: UserInput, callback?: (message: Message) => void) {
    this.userProxysService
      .updateUserRequest(userId, user)
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto) => {
          if (callback) {
            callback(data.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (callback) {
            callback(err.error.message);
          }
        },
      });
  }
}
