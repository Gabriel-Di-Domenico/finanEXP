import { CommonService } from 'finan-exp-sdk';
import { environment } from 'src/environments/environment';
import { GetAllFilter } from '../../shared/support/interfaces/getAllFilter';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Observable, tap } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerProxyInterface } from './customers.proxy.interface';
import { UpdateFilter } from '../../shared/support/interfaces/updateFilter';
import { CustomerInput } from 'src/app/core/dtos/customers/customerInput';
import { CustomerOutput } from 'src/app/core/dtos/customers/customerOutput';

@Injectable({
  providedIn: 'root',
})
export class CustomersProxyService implements CustomerProxyInterface {
  private basePath = `${environment.baseUrl}/customers`;

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
  public update(customerId: string, customer: CustomerOutput, updateFilter?: UpdateFilter): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    let params = new HttpParams();
    if (updateFilter?.toArchive != null) {
      params = params.append('toArchive', updateFilter?.toArchive);
    }
    return <Observable<any>>this.httpClient.put(`${this.basePath}/${customerId}`, customer, { headers, params }).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.commonService.logout();
          }
        },
      })
    );
  }
  public getAll(filter?:GetAllFilter): Observable<ResponseDto<Array<CustomerOutput>>> {
    const headers = this.commonService.getHeaders();
    let params = new HttpParams();
    if (filter && filter.isArchived != null) {
      params = params.append('isArchived', filter.isArchived);
    }
    return <Observable<any>> this.httpClient.get(`${this.basePath}`, { headers, params }).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.commonService.logout();
          }
        },
      })
    );
  }
  public getById(customerId: string): Observable<ResponseDto<CustomerOutput>> {
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
