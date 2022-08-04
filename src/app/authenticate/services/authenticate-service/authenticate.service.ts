import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  registerNewUser(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:51235/users/add', user)
  }
  authUser(user: User, callback: Function): void {
    this.httpClient.post('http://localhost:51235/users/auth', user).subscribe((data) => {
      const response: any = { ...data }
      callback({ message: response.message, error: false })
      window.localStorage.removeItem('fSSIdtkn')
      window.localStorage.setItem('fSSIdtkn', response.token)
    }, (err) => {
      callback({ message: err.error.message, error: true })
    })
  }
}
