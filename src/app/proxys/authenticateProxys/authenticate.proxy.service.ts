import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInput } from '../../support/interfaces/userInput.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateProxyService {
  constructor(private httpClient: HttpClient) { }

  registerNewUserRequest(user: UserInput): Observable<any> {
    return this.httpClient.post('http://localhost:51235/users/add/', user)
  }
  authUserRequest(user: UserInput): Observable<any> {
    return this.httpClient.post('http://localhost:51235/auth/user', user)
  }
}
