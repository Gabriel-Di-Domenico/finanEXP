import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { take } from 'rxjs';

import { UserHandlerService } from '../../../../../shared/handlers/user-handler.service';

import { IProfileService } from './IProfile.service.interface';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { UserProxysService } from 'src/app/shared/proxys/userProxys/user-proxys.service';
import { UserInput } from 'src/app/shared/support/interfaces/user/userInput.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService implements IProfileService {
  constructor(
    private userProxysService: UserProxysService,
    private userHandlerService: UserHandlerService,
    private router: Router
  ) {}
  updateProfilePreferences(userId: string, user: UserInput, callback?: (message: Message) => void): void {
    this.userProxysService
      .updateUserRequest(userId, user)
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto) => {
          this.userHandlerService.emit(userId);
          if (callback) {
            callback(data.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.router.navigate(['auth']);
          }
          if (callback) {
            callback(err.error.message);
          }
        },
      });
  }
}
