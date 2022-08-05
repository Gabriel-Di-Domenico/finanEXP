import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private httpClient: HttpClient) { }

  registerNewUser(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:51235/users/add', user)
  }
  authUser(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:51235/users/auth', user)
  }
}
