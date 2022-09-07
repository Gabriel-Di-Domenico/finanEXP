import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { UserCrudProxysService } from '../proxys/userCrudProxys/user-crud-proxys.service';
import UserOutput  from '../support/interfaces/userOutput.interface';
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
    this.userCrudProxysService.getUserByIdRequest(id).subscribe({
      next: (user: UserOutput) => {
        this.getUser.emit(user)
      }
    })
  }

}
