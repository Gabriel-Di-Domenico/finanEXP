import  ResponseDto  from 'src/app/shared/support/classes/responseDto';
import { take } from 'rxjs';
import { UserCrudProxysService } from '../../../../../shared/proxys/userCrudProxys/user-crud-proxys.service';
import { Injectable } from '@angular/core';
import ISecurityService from './ISecurity.service.interface';
import { HttpErrorResponse } from '@angular/common/http';
import UserPasswordDto from 'src/app/shared/support/interfaces/userPasswordDto.interface';

@Injectable({
  providedIn: 'root'
})
export class SecurityService implements ISecurityService {

  constructor(
    private userCrudProxysService: UserCrudProxysService
  ) { }
  public updateUserPassword(userId: string, passwordConfigs: UserPasswordDto, callback?: Function) {
    this.userCrudProxysService.updateUserPasswordRequest(userId, passwordConfigs)
      .pipe(
        take(1)
      )
      .subscribe(
        {
          next: (data: ResponseDto) => {
            if (callback) {
              callback(data.message)
            }
          },
          error: (err: HttpErrorResponse) => {
            if (callback) {
              callback(err.error.message)
            }
          }
        }
      )
  };
}
