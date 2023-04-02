import { CommonService } from 'finan-exp-sdk';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';

import { Observable, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserProxysInterface } from './user-proxys.interface';
import { UserInput } from 'src/app/core/dtos/user/userInput';
import { UserOutput } from 'src/app/core/dtos/user/userOutput';

@Injectable({
  providedIn: 'root',
})
export class UserProxysService implements UserProxysInterface {
  private basePath = `${environment.baseUrl}/users`;

  constructor(private httpClient: HttpClient, private commonService: CommonService, private router: Router) {}
  public createNewUserRequest(user: UserInput): Observable<ResponseDto> {
    return <Observable<ResponseDto>>this.httpClient.post(`${this.basePath}/add`, user);
  }
  public getUserByIdRequest(id: string): Observable<ResponseDto<UserOutput>> {
    const headers = this.commonService.getHeaders();
    return <Observable<any>>this.httpClient.get(`${this.basePath}/${id}`, { headers }).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.commonService.logout();
          }
        },
      })
    );
  }
  public updateUserRequest(userId: string, user: UserInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();

    return <Observable<any>>this.httpClient.put(`${this.basePath}/${userId}`, user, { headers }).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.commonService.logout();
          }
        },
      })
    );
  }
}
