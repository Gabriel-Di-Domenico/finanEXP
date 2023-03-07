import { CommonService } from 'finan-exp-sdk';
import { environment } from 'src/environments/environment';
import { GetAllFilter } from '../../shared/support/interfaces/getAllFilter';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseDto } from '../../shared/support/classes/responseDto';
import { TransactionType } from '../../shared/support/enums/transactionTypes/transaction-types';
import { TransactionInput } from 'src/app/core/dtos/transactions/transactionInput';
import { TransactionOutput } from 'src/app/core/dtos/transactions/transactionOutput';

@Injectable({
  providedIn: 'root',
})
export class TransactionsProxysService {
  private basePath = `${environment.baseUrl}/transactions`;
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}

  public delete(id: string): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.delete(`${this.basePath}/${id}`, { headers });
  }
  public update(id: string, transaction: TransactionInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.put(`${this.basePath}/${id}`, transaction, { headers });
  }
  public create(transaction: TransactionInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.post(`${this.basePath}`, transaction, { headers });
  }
  public getAll(filter?: GetAllFilter): Observable<ResponseDto<Array<TransactionOutput>>> {
    const headers = this.commonService.getHeaders();
    let params = new HttpParams();

    if (filter?.transactionType != null && filter.transactionType !== TransactionType.transactions) {
      params = params.append('transactionType', filter?.transactionType);
    }

    return <Observable<ResponseDto<Array<TransactionOutput>>>>this.httpClient.get(`${this.basePath}`, { headers, params });
  }
  public getById(id: string): Observable<ResponseDto<TransactionOutput>> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto<TransactionOutput>>>this.httpClient.get(`${this.basePath}/${id}`, { headers });
  }
}
