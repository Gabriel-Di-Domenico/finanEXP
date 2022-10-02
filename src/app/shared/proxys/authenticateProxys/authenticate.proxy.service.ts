import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import IAuthenticateProxyService from './IAuthenticate.proxys.service.interface';
import UserInput from '../../support/interfaces/userInput.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateProxyService implements IAuthenticateProxyService {
  constructor(private httpClient: HttpClient) {}
  private basePath = 'http://localhost:51235/auth/';

  authUserRequest(user: UserInput): Observable<any> {
    return this.httpClient.post(`${this.basePath}user`, user);
  }
  verifyTokenRequest(): Observable<any> {
    const token = window.localStorage.getItem('fSSIdtkn');
    const httpHeaders: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.httpClient.get(`${this.basePath}verifyToken`, { headers: httpHeaders });
  }
}
