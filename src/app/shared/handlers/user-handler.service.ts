import { ResponseGetUserByIdDto } from 'src/app/shared/support/classes/responseGetUserByIdDto';
import { Injectable, EventEmitter } from '@angular/core';

import { Observable, take } from 'rxjs';

import IUserHandlerService from './IUser-handler.service.interface';
import { UserProxysService } from '../proxys/userProxys/user-proxys.service';

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService implements IUserHandlerService {

  constructor(
    private userProxysService: UserProxysService
  ) { }
  private getUser = new EventEmitter();

  registerGetUser(): Observable<any> {
    return this.getUser;
  }
  emit(id: string) {
    this.userProxysService.getUserByIdRequest(id)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: ResponseGetUserByIdDto) => {
          this.getUser.emit(data.user);
        }
      });
  }

}
