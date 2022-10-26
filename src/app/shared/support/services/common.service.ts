import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private router: Router, private observer: BreakpointObserver) {}

  public getHeaders(): HttpHeaders {
    const token = window.localStorage.getItem('fSSIdtkn');
    const httpHeaders: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return httpHeaders;
  }

  public logout(): void {
    window.localStorage.removeItem('fSSIdtkn');
    this.router.navigate(['auth']);
  }

  public startViewPortSizeObserver() {
    return this.observer.observe('(max-width:768px)')
  }
}
