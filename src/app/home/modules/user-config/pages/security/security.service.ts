import { UserConfigProxyService } from './../../../../../shared/proxys/user-config-proxys/user-config.proxy.service';
import ResponseDto from 'src/app/shared/support/classes/responseDto';
import { take } from 'rxjs';

import { Injectable } from '@angular/core';
import ISecurityService from './ISecurity.service.interface';
import { HttpErrorResponse } from '@angular/common/http';
import UserPasswordDto from 'src/app/shared/support/interfaces/userPasswordDto.interface';
import Message from 'src/app/shared/support/interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class SecurityService implements ISecurityService {
  constructor(private userConfigProxyService: UserConfigProxyService) {}
  public updateUserPassword(userId: string, passwordConfigs: UserPasswordDto, callback?: (message: Message) => void) {
    this.userConfigProxyService
      .updateUserPasswordRequest(userId, passwordConfigs)
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
