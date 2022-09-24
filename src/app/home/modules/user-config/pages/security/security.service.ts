import { take } from 'rxjs';
import { UserCrudProxysService } from '../../../../../shared/proxys/userCrudProxys/user-crud-proxys.service';
import { Injectable } from '@angular/core';
import ISecurityService from './ISecurity.service.interface';
import { HttpErrorResponse } from '@angular/common/http';
import  UserPasswordDto  from 'src/app/shared/support/interfaces/userPasswordDto.interface';
import User from 'src/app/shared/support/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class SecurityService implements ISecurityService {

  constructor(
    private userCrudProxysService:UserCrudProxysService
  ) { }
  public updateUserPassword(userId: string, passwordConfigs: UserPasswordDto, callback?: Function){
    this.userCrudProxysService.updateUserPasswordRequest(userId, passwordConfigs).pipe(take(1)).subscribe(
      {
        next:(data: User) => {
          if(callback){
            callback()
          }
        },
        error:(err: HttpErrorResponse) => {
          if(callback){
            callback(err)
          }
        }
      }
    )
  };
}
