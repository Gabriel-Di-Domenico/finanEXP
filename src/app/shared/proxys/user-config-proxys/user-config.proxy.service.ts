import { CommonService } from './../../support/services/common.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import userInterface from '../../support/interfaces/user.interface';
import userPasswordDtoInterface from '../../support/interfaces/userPasswordDto.interface';
import IUserConfigProxyService from './IUser-config.proxy.service.interface';

@Injectable({
  providedIn: 'root',
})
export class UserConfigProxyService implements IUserConfigProxyService {
  private basePath = 'http://localhost:51235/user-settings/';
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}

  updateUserRequest(userId: string, user: userInterface): Observable<any> {
    const token = window.localStorage.getItem('fSSIdtkn');
    const httpHeaders: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.httpClient.put(`${this.basePath}${userId}`, user, { headers: httpHeaders });
  }
  updateUserPasswordRequest(userId: string, passwordConfigs: userPasswordDtoInterface): Observable<any> {
    const headers = this.commonService.getHeaders();

    return this.httpClient.put(`${this.basePath}update-password/${userId}`, passwordConfigs, { headers });
  }
}
