import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserInput from '../../support/interfaces/userInput.interface';

import IUserCrudProxysService from './IUser-Crud.proxys.service.interface';


@Injectable({
  providedIn: 'root'
})
export class UserCrudProxysService implements IUserCrudProxysService {
  private basePath: string = 'http://localhost:51235/users/'
  constructor(private httpClient: HttpClient) { }
  public createNewUserRequest(user: UserInput): Observable<any> {
    return this.httpClient.post(`${this.basePath}add`, user)
  }
  public getUserByIdRequest(id: string): Observable<any> {
    const token = window.localStorage.getItem('fSSIdtkn')
    const httpHeaders: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` })
    return this.httpClient.get(`${this.basePath}${id}`, { headers: httpHeaders })
  }
}
