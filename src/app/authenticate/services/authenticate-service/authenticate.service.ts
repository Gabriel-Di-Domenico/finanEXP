import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  users: User[] = [

  ]
  constructor(private httpClient: HttpClient) { }
  getUsers() {
    this.httpClient.get('http://localhost:51235/users').subscribe(res => {
      console.log(res)
    })
    return this.users
  }
  registerNewUser(User: User) {
    this.users.push(User)
  }
}
