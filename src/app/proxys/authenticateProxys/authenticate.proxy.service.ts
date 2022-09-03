import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/support/interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateProxyService {
  constructor(private httpClient: HttpClient) { }

  registerNewUserRequest(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:51235/users/add/', user)
  }
  authUserRequest(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:51235/auth/user', user)
  }
}
