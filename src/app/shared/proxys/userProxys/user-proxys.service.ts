import { ResponseGetUserByIdDto } from 'src/app/shared/support/classes/responseGetUserByIdDto';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CommonService } from '../../support/services/common.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInput } from '../../support/interfaces/user/userInput.interface';

import UserProxysInterface from './user-proxys.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProxysService implements UserProxysInterface {
  private basePath = 'http://localhost:51235/users/';
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}
  public createNewUserRequest(user: UserInput): Observable<ResponseDto> {
    return <Observable<ResponseDto>>this.httpClient.post(`${this.basePath}add`, user);
  }
  public getUserByIdRequest(id: string): Observable<ResponseGetUserByIdDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseGetUserByIdDto>>this.httpClient.get(`${this.basePath}${id}`, { headers });
  }
  public updateUserRequest(userId: string, user: UserInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();

    return <Observable<ResponseDto>>this.httpClient.put(`${this.basePath}${userId}`, user, { headers });
  }
}
