import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  users: any = []
  constructor(private httpClient: HttpClient) { }
  async getUsers() {
    await this.httpClient.get('http://localhost:51235/users').subscribe(response => {
      this.users = response
    })
    return this.users
  }
  async registerNewUser(user: User) {
    await this.httpClient.post('http://localhost:51235/users/add', user).subscribe(response => {

    })
  }
}
