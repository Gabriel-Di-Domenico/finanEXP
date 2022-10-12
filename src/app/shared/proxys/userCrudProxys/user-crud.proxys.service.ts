import { CommonService } from './../../support/services/common.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserInput from '../../support/interfaces/userInput.interface';

import IUserCrudProxysService from './IUser-Crud.proxys.service.interface';

@Injectable({
  providedIn: 'root',
})
export class UserCrudProxysService implements IUserCrudProxysService {
  private basePath = 'http://localhost:51235/users/';
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}
  public createNewUserRequest(user: UserInput): Observable<any> {
    return this.httpClient.post(`${this.basePath}add`, user);
  }
  public getUserByIdRequest(id: string): Observable<any> {
    const headers = this.commonService.getHeaders();
    return this.httpClient.get(`${this.basePath}${id}`, { headers });
  }
}
