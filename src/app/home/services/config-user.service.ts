import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigUserService {

  constructor(private http: HttpClient) { }
  getCurrentUser(): Observable<any> {
    const token = window.localStorage.getItem('fSSIdtkn')
    const httpHeaders: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` })
    return this.http.get('http://localhost:51235/auth/verifyToken', { headers: httpHeaders })
  }
}
