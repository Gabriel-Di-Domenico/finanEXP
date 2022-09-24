import  ResponseGetUserByIdDto  from 'src/app/shared/support/classes/responseGetUserByIdDto';
import { Injectable, EventEmitter } from '@angular/core';

import { Observable, take } from 'rxjs';

import { UserCrudProxysService } from '../proxys/userCrudProxys/user-crud-proxys.service';
import UserOutput from '../support/interfaces/userOutput.interface';
import IUserHandlerService from './IUser-handler.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService implements IUserHandlerService {

  constructor(
    private userCrudProxysService: UserCrudProxysService
  ) { }
  private getUser = new EventEmitter()

  registerGetUser(): Observable<any> {
    return this.getUser
  }
  emit(id: string) {
    this.userCrudProxysService.getUserByIdRequest(id)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: ResponseGetUserByIdDto) => {
          this.getUser.emit(data.user)
        }
      })
  }

}
