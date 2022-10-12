import { CommonService } from './../../support/services/common.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import IAuthenticateProxyService from './IAuthenticate.proxys.service.interface';
import UserInput from '../../support/interfaces/userInput.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateProxyService implements IAuthenticateProxyService {
  private basePath = 'http://localhost:51235/auth/';
  constructor(
    private httpClient: HttpClient,
    private commonService:CommonService
  ) {}

  authUserRequest(user: UserInput): Observable<any> {
    return this.httpClient.post(`${this.basePath}user`, user);
  }
  verifyTokenRequest(): Observable<any> {
    const headers= this.commonService.getHeaders();

    return this.httpClient.get(`${this.basePath}verifyToken`, { headers });
  }
}
