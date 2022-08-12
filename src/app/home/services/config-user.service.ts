import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigUserService {

  constructor(private http: HttpClient) { }
  getCurrentUser(): Observable<any> {
    const token = window.localStorage.getItem('fSSIdtkn')

    return this.http.post('http://localhost:51235/verifyToken', {token})
  }
}
