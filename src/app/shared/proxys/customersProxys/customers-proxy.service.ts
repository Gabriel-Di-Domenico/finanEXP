import ResponseDto from 'src/app/shared/support/classes/responseDto';
import { Observable } from 'rxjs';
import { CommonService } from './../../support/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CustomerInput from '../../support/interfaces/customers/customerInput.interface';
import ResponseGetAllCustomersDto from '../../support/classes/customers/responseGetAllCustomersDto';
import ResponseGetByIdCustomerDto from '../../support/classes/customers/responseGetByIdCustomerDto';

@Injectable({
  providedIn: 'root',
})
export class CustomersProxyService {
  private basePath = 'http://localhost:51235/customers';
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}
  public create(customer: CustomerInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.post(`${this.basePath}`, customer, { headers });
  }
  public update(customerId: string, customer: CustomerInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.put(`${this.basePath}/${customerId}`, customer, { headers });
  }
  public getAll(): Observable<ResponseGetAllCustomersDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseGetAllCustomersDto>>this.httpClient.get(`${this.basePath}`, { headers });
  }
  public getById(customerId: string): Observable<ResponseGetByIdCustomerDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseGetByIdCustomerDto>>this.httpClient.get(`${this.basePath}/${customerId}`, { headers });
  }
  public delete(customerId: string): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.delete(`${this.basePath}/${customerId}`, { headers });
  }
}
