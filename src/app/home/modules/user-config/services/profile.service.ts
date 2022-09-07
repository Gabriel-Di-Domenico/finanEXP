import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { take } from 'rxjs';

import { UserHandlerService } from '../../../../shared/handlers/user-handler.service';
import User from '../../../../shared/support/interfaces/user.interface';
import { UserCrudProxysService } from '../../../../shared/proxys/userCrudProxys/user-crud-proxys.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private userCrudProxysService: UserCrudProxysService,
    private userHandlerService: UserHandlerService
  ) { }
  updateProfilePreferences(userId: string, user: User, callback?: Function) {
    this.userCrudProxysService.updateUserRequest(userId, user)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: User) => {
          this.userHandlerService.emit(userId)
          if (callback) {
            callback()
          }
        },
        error: (err: HttpErrorResponse) => {
          if (callback) {
            callback(err)
          }
        }
      })
  }
}
