import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Injectable, EventEmitter } from '@angular/core';

import { Observable, take } from 'rxjs';

import { IUserHandlerService } from './IUser-handler.service.interface';
import { UserProxysService } from '../../api/userProxy/user-proxys.service';
import { UserOutput } from 'src/app/core/dtos/user/userOutput';

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
        next: (data: ResponseDto<UserOutput>) => {
          this.getUser.emit(data.content);
        }
      });
  }

}
