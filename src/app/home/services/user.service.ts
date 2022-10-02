import { UserCrudProxysService } from '../../shared/proxys/userCrudProxys/user-crud.proxys.service';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import ResponseGetUserByIdDto from 'src/app/shared/support/classes/responseGetUserByIdDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private userCrudProxysService: UserCrudProxysService) {}

  getUserById(userId: string, callback?: (data: ResponseGetUserByIdDto) => void): void {
    this.userCrudProxysService
      .getUserByIdRequest(userId)
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseGetUserByIdDto) => {
          if(callback){
            callback(data);
          }
        },
      });
  }
}
