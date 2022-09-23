import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import IAuthenticateProxyService from './IAuthenticate.proxys.service.interface';
import UserInput from '../../support/interfaces/userInput.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateProxyService implements IAuthenticateProxyService {
  constructor(private httpClient: HttpClient) { }

  authUserRequest(user: UserInput): Observable<any> {
    return this.httpClient.post('http://localhost:51235/auth/user', user)
  }

}
