import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserInput from '../../support/interfaces/userInput.interface';
import User from '../../support/interfaces/user.interface';
import IUserCrudProxysService from './IUser-Crud.proxys.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserCrudProxysService implements IUserCrudProxysService {

  constructor(private httpClient: HttpClient) { }
  createNewUserRequest(user: UserInput): Observable<any> {
    return this.httpClient.post('http://localhost:51235/users/add', user)
  }
  getUserByIdRequest(id: string): Observable<any> {
    const token = window.localStorage.getItem('fSSIdtkn')
    const httpHeaders: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` })
    return this.httpClient.get(`http://localhost:51235/users/${id}`, { headers: httpHeaders })
  }
  updateUserRequest(userId: String, user: User): Observable<any> {
    const token = window.localStorage.getItem('fSSIdtkn')
    const httpHeaders: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` })
    return this.httpClient.put(`http://localhost:51235/users/${userId}`, user, { headers: httpHeaders })
  }
}
