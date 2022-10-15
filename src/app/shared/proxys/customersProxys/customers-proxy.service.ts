import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Observable, tap } from 'rxjs';
import { CommonService } from './../../support/services/common.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerInput } from '../../support/interfaces/customers/customerInput.interface';
import { ResponseGetAllCustomersDto } from '../../support/classes/customers/responseGetAllCustomersDto';
import { ResponseGetByIdCustomerDto } from '../../support/classes/customers/responseGetByIdCustomerDto';
import { CustomerProxyInterface } from './customers.proxy.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomersProxyService implements CustomerProxyInterface {
  private basePath = 'http://localhost:51235/customers';

  constructor(private httpClient: HttpClient, private commonService: CommonService) {}
  public create(customer: CustomerInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<any>>this.httpClient.post(`${this.basePath}`, customer, { headers }).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.commonService.logout();
          }
        },
      })
    );
  }
  public update(customerId: string, customer: CustomerInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<any>>this.httpClient.put(`${this.basePath}/${customerId}`, customer, { headers }).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.commonService.logout();
          }
        },
      })
    );
  }
  public getAll(): Observable<ResponseGetAllCustomersDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<any>>this.httpClient.get(`${this.basePath}`, { headers }).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.commonService.logout();
          }
        },
      })
    );
  }
  public getById(customerId: string): Observable<ResponseGetByIdCustomerDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<any>>this.httpClient.get(`${this.basePath}/${customerId}`, { headers }).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.commonService.logout();
          }
        },
      })
    );
  }
  public delete(customerId: string): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<any>>this.httpClient.delete(`${this.basePath}/${customerId}`, { headers }).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.commonService.logout();
          }
        },
      })
    );
  }
}
