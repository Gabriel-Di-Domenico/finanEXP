import { ResponseDto } from 'src/app/shared/support/classes/responseDto';

import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { UserProxysService } from 'src/app/api/userProxy/user-proxys.service';
import { UserOutput } from 'src/app/core/dtos/user/userOutput';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private userProxysService: UserProxysService) {}

  getUserById(userId: string, callback?: (data: ResponseDto<UserOutput>) => void): void {
    this.userProxysService
      .getUserByIdRequest(userId)
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto<UserOutput>) => {
          if(callback){
            callback(data);
          }
        },
      });
  }
}
