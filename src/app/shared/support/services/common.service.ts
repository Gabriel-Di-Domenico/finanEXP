import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public getHeaders(): HttpHeaders{
    const token = window.localStorage.getItem('fSSIdtkn');
    const httpHeaders: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return httpHeaders;
  }

}
