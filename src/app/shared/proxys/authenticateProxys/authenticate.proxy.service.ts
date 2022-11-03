import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CommonService } from './../../support/services/common.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthenticateProxyInterface } from './authenticate.proxy.interface';
import { UserInput } from '../../support/interfaces/user/userInput.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateProxyService implements AuthenticateProxyInterface {
  private basePath = 'http://localhost:51235/auth/';
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}

  authUserRequest(user: UserInput): Observable<ResponseDto<string>> {
    return <Observable<ResponseDto<string>>>this.httpClient.post(`${this.basePath}user`, user);
  }
  verifyTokenRequest(): Observable<ResponseDto<string>> {
    const headers = this.commonService.getHeaders();

    return <Observable<ResponseDto<string>>>this.httpClient.get(`${this.basePath}verifyToken`, { headers });
  }
}
