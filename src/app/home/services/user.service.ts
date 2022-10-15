
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { UserProxysService } from 'src/app/shared/proxys/userProxys/user-proxys.service';
import { ResponseGetUserByIdDto } from 'src/app/shared/support/classes/responseGetUserByIdDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private userProxysService: UserProxysService) {}

  getUserById(userId: string, callback?: (data: ResponseGetUserByIdDto) => void): void {
    this.userProxysService
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
