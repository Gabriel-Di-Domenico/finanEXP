import { ResponseAuthUserDto } from 'src/app/shared/support/classes/responseAuthUserDto';
import { CommonService } from './../../support/services/common.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ResponseVerifyTokenDto } from '../../support/classes/responseVerifyTokenDto';
import { AuthenticateProxyInterface } from './authenticate.proxy.interface';
import { UserInput } from '../../support/interfaces/user/userInput.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateProxyService implements AuthenticateProxyInterface {
  private basePath = 'http://localhost:51235/auth/';
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}

  authUserRequest(user: UserInput): Observable<ResponseAuthUserDto> {
    return <Observable<ResponseAuthUserDto>>this.httpClient.post(`${this.basePath}user`, user);
  }
  verifyTokenRequest(): Observable<ResponseVerifyTokenDto> {
    const headers = this.commonService.getHeaders();

    return <Observable<ResponseVerifyTokenDto>>this.httpClient.get(`${this.basePath}verifyToken`, { headers });
  }
}
