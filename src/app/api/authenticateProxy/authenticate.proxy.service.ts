import { CommonService } from 'finan-exp-services';
import { environment } from 'src/environments/environment';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthenticateProxyInterface } from './authenticate.proxy.interface';
import { UserInput } from 'src/app/core/dtos/user/userInput';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateProxyService implements AuthenticateProxyInterface {
  private basePath = `${environment.baseUrl}/auth`;
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}

  authUserRequest(user: UserInput): Observable<ResponseDto<string>> {
    return <Observable<ResponseDto<string>>>this.httpClient.post(`${this.basePath}/user`, user);
  }
  verifyTokenRequest(): Observable<ResponseDto<string>> {
    const headers = this.commonService.getHeaders();

    return <Observable<ResponseDto<string>>>this.httpClient.get(`${this.basePath}/verifyToken`, { headers });
  }
}
